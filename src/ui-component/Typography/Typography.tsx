import { JSX } from 'preact';
import { CSSProperties } from 'preact/compat';
import { useTheme } from '../../context/ThemeProvider';
import './Typography.scss';

export type TypographyVariant = 'display-large' | 'h1' | 'h2' | 'h3' | 'h4' | 'body-large' | 'body-medium' | 'body-small' | 'caption';

export interface TypographyProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'style'> {
    variant?: TypographyVariant;
    component?: any;
    align?: 'left' | 'center' | 'right' | 'justify';
    color?: string; // e.g. 'text-primary'
    children: preact.ComponentChildren;
    /**
     * 스타일 오버라이드를 위한 sx prop
     * prop 기반 스타일(color 등)을 덮어쓸 수 있습니다.
     */
    sx?: CSSProperties;
}

export function Typography({ variant = 'body-medium', component, align = 'left', color, className = '', children, sx, ...props }: TypographyProps) {
    const { theme, contrast } = useTheme();

    // Determine default tag based on variant if component is not provided
    const Tag = component || (variant.startsWith('h') ? variant : variant.startsWith('display') ? 'h1' : 'p');

    const classes = ['typography', `typography--${variant}`, `typography--align-${align}`, className].filter(Boolean).join(' ');

    // 1. prop 기반 스타일
    const propBasedStyle: CSSProperties = {
        ...(color && { color: `var(--color-${color}, inherit)` }),
    };

    // 2. sx prop으로 오버라이드
    const computedStyle = {
        ...propBasedStyle,
        ...(sx || {}),
    };

    return (
        <Tag className={classes} style={computedStyle} data-theme={theme} data-contrast={contrast} {...props}>
            {children}
        </Tag>
    );
}
