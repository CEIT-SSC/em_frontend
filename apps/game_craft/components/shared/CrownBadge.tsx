'use client';

import { theme } from 'antd';
import { CrownOutlined } from '@ant-design/icons';

const { useToken } = theme;

interface CrownBadgeProps {
  size?: number;
}

export default function CrownBadge({ size = 20 }: CrownBadgeProps) {
  const { token } = useToken();

  return (
    <div
      style={{
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: token.colorWarning,
        borderRadius: '50%',
        width: size + 8,
        height: size + 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        zIndex: 10,
      }}
    >
      <CrownOutlined
        style={{
          fontSize: size,
          color: 'white'
        }}
      />
    </div>
  );
}
