import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export type TypographyVariant = 'display-large' | 'h1' | 'h2' | 'h3' | 'h4' | 'body-large' | 'body-medium' | 'body-small' | 'caption';

export interface TypographyProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'style'> {
    variant?: TypographyVariant;
    component?: any;
    align?: 'left' | 'center' | 'right' | 'justify';
    color?: string; // e.g. 'text-primary'
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function Typography({ variant = 'body-medium', component, align = 'left', color, className = '', children, sx, ...props }: TypographyProps) {
    const { theme, contrast } = useTheme();

    // Determine default tag based on variant if component is not provided
    const Tag = component || (variant.startsWith('h') ? variant : variant.startsWith('display') ? 'h1' : 'p');

    const classes = ['typography', `typography--${variant}`, `typography--align-${align}`, className].filter(Boolean).join(' ');

    const computedStyle = {
        ...(color && { color: `var(--color-${color}, inherit)` }),
        ...sxToStyle(sx),
    };

    return (
        <Tag className={classes} style={computedStyle} data-theme={theme} data-contrast={contrast} {...props}>
            {children}
        </Tag>
    );
}
