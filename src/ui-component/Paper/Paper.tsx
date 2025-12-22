import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface PaperProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    elevation?: number; // 0 to 5
    variant?: 'elevation' | 'outlined';
    square?: boolean;
    padding?: string; // 'sm', 'md', 'lg'
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function Paper({ elevation = 1, variant = 'elevation', square = false, padding = 'md', className = '', children, sx, ...props }: PaperProps) {
    const { theme, contrast } = useTheme();

    const classes = [
        'paper',
        `paper--${variant}`,
        variant === 'elevation' ? `paper--elevation-${elevation}` : '',
        square ? 'paper--square' : '',
        padding ? `paper--padding-${padding}` : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes} style={sxToStyle(sx)} data-theme={theme} data-contrast={contrast} {...props}>
            {children}
        </div>
    );
}
