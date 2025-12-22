import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface AvatarProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    src?: string;
    alt?: string;
    variant?: 'circular' | 'rounded' | 'square';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    sx?: SxProps;
    children?: preact.ComponentChildren;
}

export function Avatar({ src, alt, variant = 'circular', size = 'md', className = '', children, sx, ...props }: AvatarProps) {
    const { theme, contrast } = useTheme();

    const classes = ['avatar', `avatar--${variant}`, `avatar--${size}`, className].filter(Boolean).join(' ');

    return (
        <div className={classes} style={sxToStyle(sx)} data-theme={theme} data-contrast={contrast} {...props}>
            {src ? <img src={src} alt={alt} className="avatar__img" /> : children}
        </div>
    );
}
