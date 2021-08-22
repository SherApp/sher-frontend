import { TextInputBaseProps } from './types';
import { useMemo, useState } from 'react';
import _ from 'lodash';
import clsx from 'clsx';

const ContainedTextInput = ({
  label,
  id,
  onFocus,
  onBlur,
  onChange,
  className,
  value = '',
  ...rest
}: Exclude<TextInputBaseProps, 'label'>) => {
  const [internalValue, setInternalValue] = useState(value);
  const [focus, setFocus] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const containerClasses = clsx('relative pt-6', className);

  const inputClasses = clsx(
    'w-full tracking-widest outline-none border border-gray-200 dark:border-gray-800 px-4 py-2 rounded bg-white dark:bg-gray-700'
  );

  const labelClasses = clsx(
    focus || !_.isEmpty(internalValue)
      ? '-translate-y-6 scale-90 text-opacity-100 text-pink'
      : 'translate-y-2',
    'transition-transform transform duration-200 left-0 absolute translate-x-4 text-opacity-60 text-gray-800 dark:text-gray-200'
  );

  const renderedId = useMemo(() => id ?? _.uniqueId('input'), [id]);

  return (
    <div className={containerClasses}>
      <input
        id={renderedId}
        className={inputClasses}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={internalValue}
        {...rest}
      />
      <label className={labelClasses} htmlFor={renderedId}>
        {label}
      </label>
    </div>
  );
};

export default ContainedTextInput;
