import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface BadgeProps extends Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'style'> {
    badgeContent?: preact.ComponentChildren;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
    variant?: 'standard' | 'dot';
    invisible?: boolean;
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function Badge({ badgeContent, color = 'primary', variant = 'standard', invisible = false, className = '', children, sx, ...props }: BadgeProps) {
    const { theme } = useTheme();

    if (invisible) return <>{children}</>;

    const classes = ['badge-root', className].filter(Boolean).join(' ');

    const badgeClasses = [
        'badge',
        `badge--${color}`,
        `badge--${variant}`,
        variant === 'dot' || badgeContent === undefined || badgeContent === null ? 'badge--dot' : 'badge--standard',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <span className={classes} style={sxToStyle(sx)} {...props}>
            {children}
            {!invisible && (
                <span className={badgeClasses} data-theme={theme}>
                    {variant !== 'dot' && badgeContent}
                </span>
            )}
        </span>
    );
}
