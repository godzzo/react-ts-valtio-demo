import * as React from 'react';
import { CSSProperties, ReactNode } from 'react';

export function Row({
  style,
  children,
}: {
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        ...(style && style),
      }}
    >
      {children}
    </div>
  );
}

export function Column({
  style,
  children,
}: {
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        ...(style && style),
      }}
    >
      {children}
    </div>
  );
}

export function Box({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      {children}
    </div>
  );
}

export function PropTable({
  items,
}: {
  items: { name: string; value: any }[];
}) {
  return (
    <Column>
      {items.map((e) => (
        <Row key={e.name}>
          <Box>{e.name}</Box>
          <Box>{e.value}</Box>
        </Row>
      ))}
    </Column>
  );
}
