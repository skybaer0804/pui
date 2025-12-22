import { JSX } from 'preact';
import { CSSProperties } from 'preact/compat';
import { useTheme } from '../../context/ThemeProvider';
import './Card.scss';

export interface CardProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    interactive?: boolean;
    children: preact.ComponentChildren;
    /**
     * 스타일 오버라이드를 위한 sx prop
     */
    sx?: CSSProperties;
}

export function Card({ interactive = false, className = '', children, sx, ...props }: CardProps) {
    const { theme, contrast } = useTheme();

    const classes = ['card', interactive ? 'interactive' : '', className].filter(Boolean).join(' ');

    return (
        <div className={classes} style={sx} data-theme={theme} data-contrast={contrast} {...props}>
            {children}
        </div>
    );
}

export interface CardHeaderProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    children: preact.ComponentChildren;
    /**
     * 스타일 오버라이드를 위한 sx prop
     */
    sx?: CSSProperties;
}

export function CardHeader({ className = '', children, sx, ...props }: CardHeaderProps) {
    return (
        <div className={`card__header ${className}`} style={sx} {...props}>
            {children}
        </div>
    );
}

export interface CardBodyProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    children: preact.ComponentChildren;
    /**
     * 스타일 오버라이드를 위한 sx prop
     */
    sx?: CSSProperties;
}

export function CardBody({ className = '', children, sx, ...props }: CardBodyProps) {
    return (
        <div className={`card__body ${className}`} style={sx} {...props}>
            {children}
        </div>
    );
}

export interface CardFooterProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    children: preact.ComponentChildren;
    /**
     * 스타일 오버라이드를 위한 sx prop
     */
    sx?: CSSProperties;
}

export function CardFooter({ className = '', children, sx, ...props }: CardFooterProps) {
    return (
        <div className={`card__footer ${className}`} style={sx} {...props}>
            {children}
        </div>
    );
}
