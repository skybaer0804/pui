import { JSX } from 'preact';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface SkeletonProps extends Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'style'> {
    variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
    width?: number | string;
    height?: number | string;
    animation?: 'pulse' | 'wave' | false;
    sx?: SxProps;
}

export function Skeleton({ variant = 'text', width, height, animation = 'pulse', className = '', sx, ...props }: SkeletonProps) {
    const mergedStyle = {
        width,
        height,
        ...sxToStyle(sx),
    } as JSX.CSSProperties;

    return <span className={`skeleton skeleton--${variant} ${animation ? `skeleton--${animation}` : ''} ${className}`} style={mergedStyle} {...props} />;
}
