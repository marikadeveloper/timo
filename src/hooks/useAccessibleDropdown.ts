import { useEffect, useRef, useState } from 'react';
import { SelectOption } from '../components/select';
import {
  registerClosedDropdownHandlers,
  registerOpenDropdownHandlers,
} from '../utils/selectUtils';

type UseAccessibleDropdownInput = {
  namespace: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  value: string;
};

const useAccessibleDropdown = ({
  options,
  value,
  onChange,
  namespace,
}: UseAccessibleDropdownInput) => {
  const [isDropdownOpen, setIsDropdownOpenInternal] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const select = (value: string | boolean) => {
    if (value && typeof value === 'string') {
      onChange && onChange(value);
    }
    setIsDropdownOpen(false);
  };

  const setIsDropdownOpen = (v: boolean) => {
    if (v) {
      const selected = options.findIndex((o) => o.value === value);
      setActiveIndex(selected < 0 ? 0 : selected);
    }
    setIsDropdownOpenInternal(v);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      return registerOpenDropdownHandlers({
        activeIndex,
        namespace,
        options,
        select,
        setActiveIndex,
      });
    } else if (isFocus) {
      return registerClosedDropdownHandlers({
        setIsDropdownOpen,
      });
    }
  }, [isDropdownOpen, activeIndex, isFocus, namespace]);

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    activeIndex,
    setActiveIndex,
    select,
    setIsFocus,
    listRef,
  };
};

export default useAccessibleDropdown;
