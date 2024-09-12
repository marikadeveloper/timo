import React from 'react';
import useAccessibleDropdown from '../../hooks/useAccessibleDropdown';
import Input from '../input';
import './styles.scss';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  ariaLabel?: string;
  hasManualTextInput?: boolean;
  label: string;
  namespace?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  value: string;
};

const Select: React.FC<SelectProps> = ({
  ariaLabel = 'Select an option',
  hasManualTextInput = false,
  label,
  namespace = 'default_select_namespace',
  onChange,
  options,
  placeholder = 'Select an option',
  value,
}) => {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    activeIndex,
    setActiveIndex,
    select,
    setIsFocus,
    listRef,
  } = useAccessibleDropdown({ options, value, onChange, namespace });

  const chosen = options.find((o) => o.value === value);

  const renderManualTextInput = () => {
    // a text input can be used to filter the options or to add a new one
    return (
      <li>
        <label>
          <Input
            type='text'
            placeholder='Type to filter or add a new option'
            aria-label='Type to filter or add a new option'
          />
        </label>
      </li>
    );
  };

  const renderOptions = () => {
    return options.map(({ value: optionValue }, index) => (
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
      <label
        className='select-label'
        id={`${namespace}_label`}>
        {label}
      </label>
      <div
        className='select-container'
        data-namespace={`${namespace}-dropdown-root`}>
        <button
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
          {hasManualTextInput && renderManualTextInput()}
          {options.length ? renderOptions() : renderEmptyState()}
        </ul>
      </div>
    </>
  );
};

export default Select;
export type { SelectOption };
