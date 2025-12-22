import { JSX } from 'preact';
import { CSSProperties } from 'preact/compat';
import { useTheme } from '../../context/ThemeProvider';
import './Avatar.scss';

export interface AvatarProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    src?: string;
    alt?: string;
    variant?: 'circular' | 'rounded' | 'square';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children?: preact.ComponentChildren;
    /**
     * 스타일 오버라이드를 위한 sx prop
     */
    sx?: CSSProperties;
}

export function Avatar({ src, alt, variant = 'circular', size = 'md', className = '', children, sx, ...props }: AvatarProps) {
    const { theme, contrast } = useTheme();

    const classes = ['avatar', `avatar--${variant}`, `avatar--${size}`, className].filter(Boolean).join(' ');

    return (
        <div className={classes} style={sx} data-theme={theme} data-contrast={contrast} {...props}>
            {src ? <img src={src} alt={alt} className="avatar__img" /> : children}
        </div>
    );
}
