import { JSX } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import { useTheme } from '../../context/ThemeProvider';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<JSX.HTMLAttributes<HTMLSelectElement>, 'size' | 'style'> {
  label?: string;
  options: SelectOption[];
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  autoWidth?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  onChange?: JSX.GenericEventHandler<HTMLSelectElement>;
  sx?: SxProps;
}

export function Select({
  label,
  options,
  variant = 'outlined',
  size = 'md',
  error,
  helperText,
  fullWidth = true,
  autoWidth = false,
  className = '',
  placeholder,
  required,
  readOnly,
  disabled,
  value,
  defaultValue,
  sx,
  ...props
}: SelectProps) {
  const { theme, contrast } = useTheme();
  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = `${selectId}-label`;
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // placeholder가 있으면 기본값을 빈 문자열로 설정 (placeholder 옵션 선택)
  const initialValue =
    value !== undefined ? value : defaultValue !== undefined ? defaultValue : placeholder ? '' : undefined;
  const [currentValue, setCurrentValue] = useState<string | number | undefined>(initialValue);

  // value prop이 변경되면 currentValue 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    } else if (placeholder && currentValue === undefined) {
      // value가 없고 placeholder가 있으면 빈 문자열로 설정
      setCurrentValue('');
    }
  }, [value, placeholder]);

  // 값이 있는지 확인 (placeholder 옵션 제외: 빈 문자열은 값이 없는 것으로 간주)
  const hasValue = currentValue !== undefined && currentValue !== '' && currentValue !== null;
  const isLabelFloating = isFocused || hasValue;

  const wrapperClasses = [
    'select-group',
    variant && `select-group--${variant}`,
    fullWidth && !autoWidth ? 'select-group--fullWidth' : '',
    autoWidth ? 'select-group--autoWidth' : '',
    isLabelFloating && 'select-group--focused',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const selectClasses = [
    'select',
    `select--${size}`,
    error && 'select--error',
    disabled && 'select--disabled',
    readOnly && 'select--readOnly',
  ]
    .filter(Boolean)
    .join(' ');

  // placeholder를 첫 번째 옵션으로 추가 (native select는 placeholder를 직접 지원하지 않음)
  const selectOptions = placeholder ? [{ value: '', label: placeholder, disabled: true }, ...options] : options;

  const handleFocus = (e: JSX.TargetedFocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: JSX.TargetedFocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: JSX.TargetedEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value;
    setCurrentValue(newValue);
    props.onChange?.(e);
  };

  return (
    <div className={wrapperClasses} style={sxToStyle(sx)} data-theme={theme} data-contrast={contrast}>
      <div className="select-wrapper">
        {label && (
          <label
            id={labelId}
            htmlFor={selectId}
            className={`select-label ${isLabelFloating ? 'select-label--floating' : ''}`}
          >
            {label}
            {required && <span className="select-label--required"> *</span>}
          </label>
        )}
        <select
          ref={selectRef}
          id={selectId}
          className={selectClasses}
          aria-labelledby={label ? labelId : undefined}
          aria-invalid={error}
          aria-required={required}
          aria-readonly={readOnly}
          disabled={disabled || readOnly}
          value={currentValue ?? ''}
          data-placeholder={!hasValue && placeholder ? 'true' : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        >
          {selectOptions.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {helperText && (
        <span className={`select-helper-text ${error ? 'select-helper-text--error' : ''}`}>{helperText}</span>
      )}
    </div>
  );
}
