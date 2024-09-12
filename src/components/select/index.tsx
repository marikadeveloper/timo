import React from 'react';
import useAccessibleDropdown from '../../hooks/useAccessibleDropdown';
import './styles.scss';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  value: string;
  namespace?: string;
  onChange: (value: string) => void;
  label: string;
};

const Select: React.FC<SelectProps> = ({
  options,
  value,
  namespace = 'default_select_namespace',
  onChange,
  label,
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
          className='select-button'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          role='combobox'
          aria-autocomplete='none'
          aria-label='Choose your favourite Ninjago character'
          aria-haspopup='listbox'
          aria-controls={`${namespace}_dropdown`}
          aria-expanded={isDropdownOpen}
          aria-activedescendant={`${namespace}_element_${value}`}>
          {chosen ? `Selected: ${chosen.label}` : 'Select an option'}
          <span className='chevron'>▾</span>
        </button>
        <ul
          className='select-dropdown'
          ref={listRef}
          role='listbox'
          id={`${namespace}_dropdown`}
          tabIndex={-1}>
          {options.map(({ label, value: optionValue }, index) => (
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
          ))}
        </ul>
      </div>
    </>
  );
};

export default Select;
export type { SelectOption };
