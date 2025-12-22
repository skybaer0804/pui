import { Box, BoxProps } from './Box';
import { CSSProperties } from 'preact/compat';

export interface FlexProps extends BoxProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
}

export function Flex({
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  wrap = 'nowrap',
  gap,
  sx,
  children,
  ...props
}: FlexProps) {
  // 1. prop 기반 스타일
  const propBasedStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    ...(gap && { gap: `var(--space-gap-${gap}, ${gap})` }),
  };

  // 2. sx prop으로 오버라이드
  const computedStyle = {
    ...propBasedStyle,
    ...(sx || {}),
  };

  return (
    <Box sx={computedStyle} {...props}>
      {children}
    </Box>
  );
}
