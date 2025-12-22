import { JSX } from 'preact';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface SelectProps extends Omit<JSX.HTMLAttributes<HTMLSelectElement>, 'size' | 'style'> {
    label?: string;
    options: SelectOption[];
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    value?: string | number;
    disabled?: boolean;
    onChange?: JSX.GenericEventHandler<HTMLSelectElement>;
    sx?: SxProps;
}

export function Select({ label, options, error, helperText, fullWidth = true, className = '', sx, ...props }: SelectProps) {
    const { theme, contrast } = useTheme();
    const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const wrapperClasses = ['select-group', fullWidth ? 'fullWidth' : '', className].filter(Boolean).join(' ');
    const selectClasses = ['select', error ? 'error' : ''].filter(Boolean).join(' ');

    return (
        <div className={wrapperClasses} style={sxToStyle(sx)} data-theme={theme} data-contrast={contrast}>
            {label && (
                <label htmlFor={selectId} className="select-label">
                    {label}
                </label>
            )}
            <div className="select-wrapper">
                <select id={selectId} className={selectClasses} {...props}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* Custom arrow icon can be added here if needed via CSS or SVG */}
            </div>
            {helperText && <span className={`select-helper-text ${error ? 'error' : ''}`}>{helperText}</span>}
        </div>
    );
}
