import { Box, BoxProps } from './Box';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface FlexProps extends Omit<BoxProps, 'sx'> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  sx?: SxProps;
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
  const computedStyle = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    ...(gap && { gap: `var(--space-gap-${gap}, ${gap})` }),
    ...sxToStyle(sx),
  };

  return (
    <Box sx={computedStyle} {...props}>
      {children}
    </Box>
  );
}
