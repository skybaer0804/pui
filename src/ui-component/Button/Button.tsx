import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface ButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'style'> {
    variant?: 'primary' | 'secondary';
    size?: 'lg' | 'md' | 'sm';
    fullWidth?: boolean;
    disabled?: boolean;
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function Button({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, sx, ...props }: ButtonProps) {
    const { theme, contrast } = useTheme();

    const classes = ['button', variant, size, fullWidth ? 'fullWidth' : '', className].filter(Boolean).join(' ');

    return (
        <button className={classes} style={sxToStyle(sx)} data-theme={theme} data-contrast={contrast} {...props}>
            {children}
        </button>
    );
}
