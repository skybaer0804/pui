import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface CardProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    interactive?: boolean;
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function Card({ interactive = false, className = '', children, sx, ...props }: CardProps) {
    const { theme, contrast } = useTheme();

    const classes = ['card', interactive ? 'interactive' : '', className].filter(Boolean).join(' ');

    return (
        <div className={classes} style={sxToStyle(sx)} data-theme={theme} data-contrast={contrast} {...props}>
            {children}
        </div>
    );
}

export interface CardHeaderProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function CardHeader({ className = '', children, sx, ...props }: CardHeaderProps) {
    return (
        <div className={`card__header ${className}`} style={sxToStyle(sx)} {...props}>
            {children}
        </div>
    );
}

export interface CardBodyProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function CardBody({ className = '', children, sx, ...props }: CardBodyProps) {
    return (
        <div className={`card__body ${className}`} style={sxToStyle(sx)} {...props}>
            {children}
        </div>
    );
}

export interface CardFooterProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function CardFooter({ className = '', children, sx, ...props }: CardFooterProps) {
    return (
        <div className={`card__footer ${className}`} style={sxToStyle(sx)} {...props}>
            {children}
        </div>
    );
}
