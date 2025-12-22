import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface IconButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'style'> {
    color?: 'primary' | 'secondary' | 'error' | 'default';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function IconButton({ color = 'default', size = 'medium', disabled = false, className = '', children, sx, ...props }: IconButtonProps) {
    const { theme } = useTheme();

    const classes = ['icon-button', `icon-button--${color}`, `icon-button--${size}`, className].filter(Boolean).join(' ');

    return (
        <button className={classes} style={sxToStyle(sx)} disabled={disabled} data-theme={theme} type="button" {...props}>
            <span className="icon-button__label">{children}</span>
        </button>
    );
}
