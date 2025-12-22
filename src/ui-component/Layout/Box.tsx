import { JSX } from 'preact';
import { CSSProperties } from 'preact/compat';
import './Box.scss';

export interface BoxProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    padding?: string; // e.g., 'md', 'lg' mapping to tokens or raw values
    margin?: string;
    background?: string; // Token reference or raw value
    color?: string;
    border?: string;
    borderRadius?: string;
    width?: string;
    height?: string;
    display?: string;
    className?: string;
    /**
     * 스타일 오버라이드를 위한 sx prop
     * prop 기반 스타일(padding, margin 등)을 덮어쓸 수 있습니다.
     */
    sx?: CSSProperties;
}

export function Box({ padding, margin, background, color, border, borderRadius, width, height, display, className = '', sx, children, ...props }: BoxProps) {
    // 1. prop 기반 스타일
    const propBasedStyle: CSSProperties = {
        ...(padding && { padding: `var(--space-padding-${padding}, ${padding})` }),
        ...(margin && { margin: `var(--space-gap-${margin}, ${margin})` }),
        ...(background && { background: `var(--color-${background}, ${background})` }),
        ...(color && { color: `var(--color-${color}, ${color})` }),
        ...(border && { border: `var(--border-${border}, ${border})` }),
        ...(borderRadius && { borderRadius: `var(--primitive-radius-${borderRadius}, ${borderRadius})` }),
        ...(width && { width }),
        ...(height && { height }),
        ...(display && { display }),
    };

    // 2. sx prop으로 오버라이드
    const finalStyle = {
        ...propBasedStyle,
        ...(sx || {}),
    };

    const classes = ['box', className].filter(Boolean).join(' ');

    return (
        <div className={classes} style={finalStyle} {...props}>
            {children}
        </div>
    );
}
