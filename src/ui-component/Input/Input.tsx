import { JSX } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface InputProps extends Omit<JSX.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size' | 'style'> {
    label?: string;
    helperText?: string;
    error?: boolean;
    multiline?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
    disabled?: boolean;
    value?: string | number;
    defaultValue?: string | number;
    rows?: number;
    type?: string;
    required?: boolean;
    sx?: SxProps;
}

export function Input({
    label,
    helperText,
    error,
    multiline = false,
    fullWidth = true,
    className = '',
    value,
    defaultValue,
    placeholder,
    required,
    sx,
    ...props
}: InputProps) {
    const { theme, contrast } = useTheme();
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const labelId = `${inputId}-label`;
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState<string | number | undefined>(value ?? defaultValue);

    // value prop이 변경되면 currentValue 업데이트
    useEffect(() => {
        if (value !== undefined) {
            setCurrentValue(value);
        }
    }, [value]);

    // 값이 있는지 확인
    const hasValue = currentValue !== undefined && currentValue !== '' && currentValue !== null;
    const isLabelFloating = isFocused || hasValue || (multiline && currentValue !== undefined);

    const wrapperClasses = [
        'input-group',
        fullWidth ? 'fullWidth' : '',
        isLabelFloating && 'input-group--focused',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const inputClasses = ['input', multiline ? 'input-textarea' : '', error ? 'error' : ''].filter(Boolean).join(' ');

    const handleFocus = (e: JSX.TargetedFocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocused(true);
        props.onFocus?.(e);
    };

    const handleBlur = (e: JSX.TargetedFocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocused(false);
        props.onBlur?.(e);
    };

    const handleInput = (e: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.currentTarget.value;
        setCurrentValue(newValue);
        props.onInput?.(e);
    };

    const handleChange = (e: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.currentTarget.value;
        setCurrentValue(newValue);
        props.onChange?.(e);
    };

    return (
        <div className={wrapperClasses} style={sxToStyle(sx)} data-theme={theme} data-contrast={contrast}>
            <div className="input-wrapper">
                {label && (
                    <label
                        id={labelId}
                        htmlFor={inputId}
                        className={`input-label ${isLabelFloating ? 'input-label--floating' : ''}`}
                    >
                        {label}
                        {required && <span className="input-label--required"> *</span>}
                    </label>
                )}
                {multiline ? (
                    <textarea
                        ref={inputRef as any}
                        id={inputId}
                        className={inputClasses}
                        aria-labelledby={label ? labelId : undefined}
                        aria-invalid={error}
                        aria-required={required}
                        value={currentValue}
                        defaultValue={defaultValue}
                        placeholder={label ? undefined : placeholder}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onInput={handleInput}
                        onChange={handleChange}
                        {...(props as JSX.HTMLAttributes<HTMLTextAreaElement>)}
                    />
                ) : (
                    <input
                        ref={inputRef as any}
                        id={inputId}
                        className={inputClasses}
                        aria-labelledby={label ? labelId : undefined}
                        aria-invalid={error}
                        aria-required={required}
                        value={currentValue}
                        defaultValue={defaultValue}
                        placeholder={label ? undefined : placeholder}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onInput={handleInput}
                        onChange={handleChange}
                        {...(props as JSX.HTMLAttributes<HTMLInputElement>)}
                    />
                )}
            </div>
            {helperText && <span className={`input-helper-text ${error ? 'error' : ''}`}>{helperText}</span>}
        </div>
    );
}
