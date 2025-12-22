import { JSX } from 'preact';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface CircularProgressProps extends Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'style'> {
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit';
    size?: number | string;
    value?: number; // 0-100
    variant?: 'determinate' | 'indeterminate';
    thickness?: number;
    sx?: SxProps;
}

export function CircularProgress({
    color = 'primary',
    size = 40,
    value = 0,
    variant = 'indeterminate',
    thickness = 3.6,
    className = '',
    sx,
    ...props
}: CircularProgressProps) {
    const circleStyle: JSX.CSSProperties = {};
    const rootStyle: JSX.CSSProperties = {};
    const SIZE = 44;

    if (variant === 'determinate') {
        const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
        circleStyle.strokeDasharray = circumference.toFixed(3);
        circleStyle.strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(3)}px`;
        rootStyle.transform = 'rotate(-90deg)';
    }

    const mergedStyle = {
        width: size,
        height: size,
        ...rootStyle,
        ...sxToStyle(sx),
    } as JSX.CSSProperties;

    return (
        <span
            className={`circular-progress circular-progress--${color} circular-progress--${variant} ${className}`}
            style={mergedStyle}
            role="progressbar"
            aria-valuenow={variant === 'determinate' ? Math.round(value) : undefined}
            {...props}
        >
            <svg className="circular-progress__svg" viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}>
                <circle
                    className="circular-progress__circle"
                    style={circleStyle}
                    cx={SIZE}
                    cy={SIZE}
                    r={(SIZE - thickness) / 2}
                    fill="none"
                    strokeWidth={thickness}
                />
            </svg>
        </span>
    );
}
