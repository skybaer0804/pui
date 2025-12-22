import { JSX } from 'preact';
import { SxProps, sxToStyle } from '../../shared/sx';

// Top-level List
export interface ListProps extends Omit<JSX.HTMLAttributes<HTMLUListElement>, 'style'> {
    disablePadding?: boolean;
    sx?: SxProps;
}

export function List({ disablePadding = false, className = '', children, sx, ...props }: ListProps) {
    const classes = ['list', disablePadding ? 'list--padding-off' : '', className].filter(Boolean).join(' ');
    return (
        <ul className={classes} style={sxToStyle(sx)} {...props}>
            {children}
        </ul>
    );
}

// ListItem
export interface ListItemProps extends Omit<JSX.HTMLAttributes<HTMLLIElement>, 'style'> {
    disableGutters?: boolean;
    divider?: boolean;
    alignItems?: 'center' | 'flex-start';
    sx?: SxProps;
}

export function ListItem({ disableGutters = false, divider = false, alignItems = 'center', className = '', children, sx, ...props }: ListItemProps) {
    const classes = [
        'list-item',
        disableGutters ? 'list-item--gutters-off' : '',
        divider ? 'list-item--divider' : '',
        `list-item--align-${alignItems}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <li className={classes} style={sxToStyle(sx)} {...props}>
            {children}
        </li>
    );
}

// ListItemText
export interface ListItemTextProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    primary?: preact.ComponentChildren;
    secondary?: preact.ComponentChildren;
    sx?: SxProps;
}

export function ListItemText({ primary, secondary, className = '', sx, ...props }: ListItemTextProps) {
    return (
        <div className={`list-item-text ${className}`} style={sxToStyle(sx)} {...props}>
            {primary && <span className="list-item-text__primary">{primary}</span>}
            {secondary && <p className="list-item-text__secondary">{secondary}</p>}
        </div>
    );
}

// ListItemAvatar
export function ListItemAvatar({ className = '', children, sx, ...props }: Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> & { sx?: SxProps }) {
    return (
        <div className={`list-item-avatar ${className}`} style={sxToStyle(sx)} {...props}>
            {children}
        </div>
    );
}
