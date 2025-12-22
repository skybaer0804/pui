import { JSX, toChildArray } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface ButtonGroupProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    orientation?: 'horizontal' | 'vertical';
    fullWidth?: boolean;
    attached?: boolean; // if true, buttons touch and share borders
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function ButtonGroup({ orientation = 'horizontal', fullWidth = false, attached = true, className = '', children, sx, ...props }: ButtonGroupProps) {
    const { theme, contrast } = useTheme();

    const classes = [
        'button-group',
        `button-group--${orientation}`,
        fullWidth ? 'button-group--full-width' : '',
        attached ? 'button-group--attached' : 'button-group--spaced',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const items = toChildArray(children);

    return (
        <div className={classes} style={sxToStyle(sx)} data-theme={theme} data-contrast={contrast} role="group" {...props}>
            {items.map((child, idx) => (
                <span key={idx} className="button-group__item">
                    {child}
                </span>
            ))}
        </div>
    );
}
