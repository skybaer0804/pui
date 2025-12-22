import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export type StatusChipVariant = 'active' | 'pending' | 'badge' | 'default';

export interface StatusChipProps extends Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'style'> {
    variant?: StatusChipVariant;
    label: string;
    sx?: SxProps;
}

export function StatusChip({ variant = 'default', label, className = '', sx, ...props }: StatusChipProps) {
    const { theme, contrast } = useTheme();
    const classes = ['status-chip', variant, className].filter(Boolean).join(' ');

    return (
        <span className={classes} style={sxToStyle(sx)} data-theme={theme} data-contrast={contrast} {...props}>
            {label}
        </span>
    );
}
