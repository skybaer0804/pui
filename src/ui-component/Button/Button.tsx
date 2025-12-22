import { JSX } from 'preact';
import { CSSProperties } from 'preact/compat';
import { useTheme } from '../../context/ThemeProvider';
import './Button.scss';

export interface ButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'style'> {
    variant?: 'primary' | 'secondary';
    size?: 'lg' | 'md' | 'sm';
    fullWidth?: boolean;
    disabled?: boolean;
    children: preact.ComponentChildren;
    /**
     * 스타일 오버라이드를 위한 sx prop
     */
    sx?: CSSProperties;
}

export function Button({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, sx, ...props }: ButtonProps) {
    const { theme, contrast } = useTheme();

    const classes = ['button', variant, size, fullWidth ? 'fullWidth' : '', className].filter(Boolean).join(' ');

    return (
        <button className={classes} style={sx} data-theme={theme} data-contrast={contrast} {...props}>
            {children}
        </button>
    );
}
