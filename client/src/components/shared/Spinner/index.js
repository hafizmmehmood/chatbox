import React from 'react';
import { css } from '@emotion/react';
import ScaleLoader from 'react-spinners/ScaleLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Spinner({ loading, size, color }) {
  return (
    <ScaleLoader
      color={color || '#4f46e5'}
      loading={loading || true}
      css={override}
      size={size || 35}
    />
  );
}

export default Spinner;
