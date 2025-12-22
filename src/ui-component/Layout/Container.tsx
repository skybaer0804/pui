import { Box, BoxProps } from './Box';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface ContainerProps extends Omit<BoxProps, 'sx'> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
  fixed?: boolean; // If true, max-width matches the min-width of the current breakpoint
  disableGutters?: boolean;
  sx?: SxProps;
}

export function Container({
  maxWidth = 'lg',
  fixed = false,
  disableGutters = false,
  className = '',
  sx,
  children,
  ...props
}: ContainerProps) {
  // Note: In a real implementation with tokens, we would map maxWidth to var(--layout-container-lg) etc.
  // For now we will use inline style logic or class names mapped to tokens.

  const classes = [
    'container',
    maxWidth ? `container--max-${maxWidth}` : '',
    disableGutters ? 'container--no-gutters' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const computedStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: disableGutters ? 0 : 'var(--space-gap-md)',
    paddingRight: disableGutters ? 0 : 'var(--space-gap-md)',
    width: '100%',
    maxWidth: maxWidth ? `var(--layout-container-${maxWidth}, 100%)` : '100%',
    ...sxToStyle(sx),
  };

  return (
    <Box className={classes} style={computedStyle} {...props}>
      {children}
    </Box>
  );
}
