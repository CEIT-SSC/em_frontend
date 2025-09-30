import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const teamsSelector = (state: RootState) => state.teams;

export const teamsListSelector = createSelector(
  teamsSelector,
  (teamsState) => teamsState.teams
);

export const teamsLoadingSelector = createSelector(
  teamsSelector,
  (teamsState) => teamsState.loading
);

export const teamsErrorSelector = createSelector(
  teamsSelector,
  (teamsState) => teamsState.error
);

export const teamDetailsSelector = (id: number) =>
  createSelector(teamsSelector, (teamsState) => {
    return teamsState.teams.find((team) => team.id === id);
  });
