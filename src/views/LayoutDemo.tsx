import * as React from 'react';
import { Column, Row, Box, PropTable } from '../components/Layout';

export default function LayoutDemo() {
  const items = [
    { name: 'Base', value: 'Alahomora' },
    { name: 'Advanced', value: 'Lupino' },
    { name: 'Expert', value: 'Argo' },
  ];

  return (
    <Row>
      <PropTable items={items} />
      <Column>
        <Row>
          <Box>Name</Box>
          <Box>John</Box>
        </Row>
        <Row>
          <Box>Age</Box>
          <Box>47</Box>
        </Row>
        <Row>
          <Box>Type</Box>
          <Box>NORMAL</Box>
        </Row>
      </Column>
    </Row>
  );
}
