import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface FloatingActionButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'style'> {
    variant?: 'circular' | 'extended';
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'secondary' | 'default';
    disabled?: boolean;
    icon?: preact.ComponentChildren;
    label?: preact.ComponentChildren; // used for extended
    sx?: SxProps;
}

export function FloatingActionButton({
    variant = 'circular',
    size = 'md',
    color = 'primary',
    disabled = false,
    icon,
    label,
    className = '',
    children,
    sx,
    ...props
}: FloatingActionButtonProps) {
    const { theme, contrast } = useTheme();
    const content = children ?? (
        <>
            {icon && <span className="fab__icon">{icon}</span>}
            {(variant === 'extended' || label) && label && <span className="fab__label">{label}</span>}
        </>
    );

    const classes = ['fab', `fab--${variant}`, `fab--${size}`, `fab--${color}`, className].filter(Boolean).join(' ');

    return (
        <button className={classes} style={sxToStyle(sx)} disabled={disabled} data-theme={theme} data-contrast={contrast} type="button" {...props}>
            {content}
        </button>
    );
}
