import { JSX } from 'preact';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface DividerProps extends Omit<JSX.HTMLAttributes<HTMLHRElement>, 'style'> {
    variant?: 'fullWidth' | 'inset' | 'middle';
    orientation?: 'horizontal' | 'vertical';
    flexItem?: boolean;
    sx?: SxProps;
}

export function Divider({ variant = 'fullWidth', orientation = 'horizontal', flexItem = false, className = '', sx, ...props }: DividerProps) {
    const classes = ['divider', `divider--${variant}`, `divider--${orientation}`, flexItem ? 'divider--flexItem' : '', className].filter(Boolean).join(' ');

    return <hr className={classes} style={sxToStyle(sx)} {...props} />;
}
