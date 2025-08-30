'use client';

import { Flex, Grid, theme } from 'antd';
import { StaffContainer } from './StaffContainer';

const { useToken } = theme;
const { useBreakpoint } = Grid;

export function StaffView() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const staffViewPadding = screens.lg ? '3rem 5rem' : '3rem 2rem';

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: '100%',
        backgroundColor: token.colorPrimary,
        backgroundImage: `url(/images/pattern.svg)`,
        padding: staffViewPadding
      }}
    >
      <StaffContainer />
    </Flex>
  );
}
