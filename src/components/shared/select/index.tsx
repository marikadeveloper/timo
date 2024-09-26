import React from 'react';
import useAccessibleDropdown from '../../hooks/useAccessibleDropdown';
import './styles.scss';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  ariaLabel?: string;
  namespace?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  value: string;
};

const Select: React.FC<SelectProps> = ({
  ariaLabel = 'Select an option',
  namespace = 'default_select_namespace',
  onChange,
  options,
  placeholder = 'Select an option',
  value,
}) => {
  const {
    activeIndex,
    isDropdownOpen,
    listRef,
    select,
    setActiveIndex,
    setIsDropdownOpen,
    setIsFocus,
  } = useAccessibleDropdown({ namespace, onChange, options, value });

  const chosen = options.find((o) => o.value === value);

  const renderOptions = () => {
    return options.map(({ value: optionValue, label }, index) => (
      <li
        key={optionValue}
        id={`${namespace}_element_${optionValue}`}
        aria-selected={index === activeIndex}
        role='option'
        onMouseOver={() => setActiveIndex(index)}>
        <label>
          <input
            type='radio'
            name={`${namespace}_radio`}
            value={optionValue}
            className={chosen?.value === optionValue ? 'checked' : ''}
            checked={chosen?.value === optionValue}
            onChange={() => select(optionValue)}
          />
          <span>{label}</span>
        </label>
      </li>
    ));
  };

  const renderEmptyState = () => {
    return (
      <li>
        <label>
          <input
            type='radio'
            name={`${namespace}_radio`}
            disabled
          />
          <span>No options available</span>
        </label>
      </li>
    );
  };

  return (
    <>
      <div
        className='select-container'
        data-namespace={`${namespace}-dropdown-root`}>
        <button
          type='button'
          className='select-container__button'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          role='combobox'
          aria-autocomplete='none'
          aria-label={ariaLabel}
          aria-haspopup='listbox'
          aria-controls={`${namespace}_dropdown`}
          aria-expanded={isDropdownOpen}
          aria-activedescendant={`${namespace}_element_${value}`}>
          {chosen ? `Selected: ${chosen.label}` : placeholder}
          <span className='chevron'>▾</span>
        </button>
        <ul
          className='select-container__dropdown'
          ref={listRef}
          role='listbox'
          id={`${namespace}_dropdown`}
          tabIndex={-1}>
          {options.length ? renderOptions() : renderEmptyState()}
        </ul>
      </div>
    </>
  );
};

export default Select;
export type { SelectOption };
