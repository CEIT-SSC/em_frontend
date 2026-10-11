const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { create, act } = require('react-test-renderer');

global.IS_REACT_ACT_ENVIRONMENT = true;
const componentPath = path.join(__dirname, '../components/features/team/TeamMemberContainer.tsx');

// Render the actual container and member cards, replacing API, store and UI boundaries.
async function render(cachedTeams, apiTeams, options = {}) {
  let state = { teams: { data: cachedTeams, loading: false } };
  const listeners = new Set();
  let fetches = 0;
  const clientApi = {
    teams: { getTeamsList: async () => {
      fetches++;
      if (options.pending) return new Promise(() => {});
      if (options.error) throw new Error(options.error);
      return { status: 200, data: { data: { results: apiTeams } } };
    } },
    competitions: { getGroupCompetitionsList: async () => ({ status: 200, data: { data: { results: [{ id: 7 }] } } }) },
  };
  const dispatch = thunk => {
    const promise = thunk();
    promise.unwrap = () => promise;
    return promise;
  };
  const fetchTeamsThunk = () => async () => {
    state = { teams: { ...state.teams, loading: true, error: null } };
    listeners.forEach(listener => listener());
    try {
      const response = await clientApi.teams.getTeamsList();
      state = { teams: { data: response.data.data.results, loading: false } };
    } catch (error) {
      state = { teams: { ...state.teams, loading: false, error: error.message } };
    }
    listeners.forEach(listener => listener());
  };
  const translate = key => key;
  const cardCode = ts.transpileModule(fs.readFileSync(path.join(path.dirname(componentPath), 'TeamMemberCard.tsx'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText;
  const cardExports = {};
  const cardImports = { react: React, antd: { Flex: 'flex', Typography: { Text: 'member-label' }, theme: { useToken: () => ({ token: {} }) } }, 'next/image': props => React.createElement('img', props), '../../common/CrownBadge': props => React.createElement('crown', {}, props.children) };
  new Function('require', 'exports', cardCode)(name => cardImports[name], cardExports);
  const imports = {
    react: React,
    antd: { Alert: 'alert', Col: 'col', Flex: 'flex', Row: 'row', Spin: 'spin', theme: { useToken: () => ({ token: {} }) }, Typography: { Title: 'title' } },
    'next-intl': { useTranslations: () => translate },
    './TeamMemberCard': cardExports,
    'lib/store/store': {
      useAppSelector: selector => React.useSyncExternalStore(listener => { listeners.add(listener); return () => listeners.delete(listener); }, () => selector(state)),
      useAppDispatch: () => dispatch,
    },
    'lib/store/teams/teams.thunk': { fetchTeamsThunk },
    'lib/api/client/clientApi': { clientApi },
    'lib/utils/constants': { eventId: 202607 },
  };
  const code = ts.transpileModule(fs.readFileSync(componentPath, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
  }).outputText;
  const exports = {};
  new Function('require', 'exports', code)(name => {
    assert.ok(name in imports, `Unexpected import ${name}`);
    return imports[name];
  }, exports);
  let view;
  await act(async () => { view = create(React.createElement(exports.TeamMemberContainer)); });
  const cards = view.root.findAllByType('member-label').map(label => ({ name: label.props.children }));
  const alerts = view.root.findAllByType('alert').map(alert => alert.props);
  const spinners = view.root.findAllByType('spin').length;
  await act(async () => view.unmount());
  return { cards, fetches, alerts, spinners };
}
const users = [664, 352, 567, 566, 449, 22];
const capturedTeam = {
  id: 212, name: 'Example team', leader_details: { id: 567, email: 'leader@example.com' },
  status: 'active', group_competition_details: { id: 7, event: 202607, max_group_size: 5, title: 'GameCraft' },
  memberships: users.map((id, index) => ({ id: index + 1, status: 'accepted', expires_at: id === 352 || id === 567 ? null : '2026-10-14T10:31:01Z', user_details: { id, first_name: 'Member', last_name: String(id), email: `member${id}@example.com`, profile_picture: null } })),
  registrations: [{ id: 120, status: 'active', competition_details: { id: 7, title: 'GameCraft' }, member_ids: [664, 567, 566, 449, 22], price: '495000.00' }],
  accepted_member_count: 6,
};
const capturedTeams = [capturedTeam,
  { ...capturedTeam, id: 204, status: 'cancelled', registrations: [{ id: 103, status: 'cancelled', competition_details: { id: 7 }, member_ids: [352, 354] }] },
  { ...capturedTeam, id: 203, status: 'forming', group_competition_details: null, registrations: [] },
  { ...capturedTeam, id: 199, status: 'forming', group_competition_details: null, registrations: [] },
];

// Replay the reported response structure using synthetic profiles. In
// particular, user 352 belongs to the team but not its paid roster snapshot.
test('shows all six accepted members including the admin-added user absent from the registration snapshot', async () => {
  const before = JSON.stringify(capturedTeams);
  const { cards } = await render(capturedTeams, capturedTeams);
  assert.equal(cards.length, 6);
  assert.ok(cards.some(card => card.name === 'Member 352'));
  assert.equal(cards[0].name, 'Member 567');
  assert.equal(JSON.stringify(capturedTeams), before, 'Rendering must preserve registration snapshots and prices');
});

test('opening the page refreshes a cached five-person roster', async () => {
  const cached = { ...capturedTeam, memberships: capturedTeam.memberships.filter(member => member.user_details.id !== 352) };
  const { cards, fetches } = await render([cached], capturedTeams);
  assert.equal(fetches, 1);
  assert.equal(cards.length, 6);
});

test('a direct visit loads all six current members', async () => {
  const { cards } = await render([], capturedTeams);
  assert.equal(cards.length, 6);
});

test('historically registered members who leave the team are excluded from its current roster', async () => {
  const changed = { ...capturedTeam, memberships: capturedTeam.memberships.map(member => member.user_details.id === 664 ? { ...member, status: 'rejected' } : member) };
  const { cards } = await render([], [changed]);
  assert.equal(cards.length, 5);
  assert.ok(!cards.some(card => card.name === 'Member 664'));
  assert.ok(cards.some(card => card.name === 'Member 352'));
});

test('pending invitations and registrations outside this event do not add member cards', async () => {
  const active = { ...capturedTeam, memberships: capturedTeam.memberships.map(member => member.user_details.id === 352 ? { ...member, status: 'pending' } : member) };
  const otherEvent = { ...capturedTeam, id: 300, registrations: [{ ...capturedTeam.registrations[0], id: 200, competition_details: { id: 9 } }] };
  const { cards } = await render([], [active, ...capturedTeams.slice(1), otherEvent]);
  assert.equal(cards.length, 5);
  assert.ok(!cards.some(card => card.name === 'Member 352'));
});

test('a pending refresh shows loading instead of stale cards', async () => {
  const { cards, spinners } = await render(capturedTeams, [], { pending: true });
  assert.equal(cards.length, 0);
  assert.equal(spinners, 1);
});

test('a failed refresh shows the error instead of stale cards', async () => {
  const { cards, alerts } = await render(capturedTeams, [], { error: 'Roster unavailable' });
  assert.equal(cards.length, 0);
  assert.equal(alerts[0].type, 'error');
  assert.equal(alerts[0].description, 'Roster unavailable');
});
