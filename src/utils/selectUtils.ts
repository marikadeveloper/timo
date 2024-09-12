import { SelectOption } from '../components/select';

const registerOpenDropdownHandlers = ({
  options,
  activeIndex,
  setActiveIndex,
  select,
  namespace,
}: RegisterOpenDropdownHandlersInput) => {
  const optionsLength: number = options?.length || 0;

  const keyDownCallback = (e: KeyboardEvent) => {
    e.preventDefault();
    console.log(e);
    switch (e.key) {
      case 'Up':
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(activeIndex <= 0 ? optionsLength - 1 : activeIndex - 1);
        return;
      case 'Down':
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(activeIndex + 1 === optionsLength ? 0 : activeIndex + 1);
        return;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        select(options[activeIndex].value);
        return;
      case 'Esc':
      case 'Escape':
        e.preventDefault();
        select(false);
        return;
      case 'PageUp':
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        return;
      case 'PageDown':
      case 'End':
        e.preventDefault();
        setActiveIndex(options.length - 1);
        return;
    }
  };
  const onClick = (e: MouseEvent) => {
    if (
      !e
        .composedPath()
        .find(
          (e) =>
            (e as HTMLElement).dataset &&
            (e as HTMLElement).dataset.namespace ===
              namespace + '-dropdown-root',
        )
    ) {
      // Did not found in path, closing
      e.preventDefault();
      select(false);
    }
  };

  document.addEventListener('keydown', keyDownCallback);
  document.addEventListener('click', onClick);
  return () => {
    document.removeEventListener('keydown', keyDownCallback);
    document.removeEventListener('click', onClick);
  };
};
type RegisterOpenDropdownHandlersInput = {
  activeIndex: number;
  namespace: string;
  options: SelectOption[];
  select: (value: string | boolean) => void;
  setActiveIndex: (index: number) => void;
};

const registerClosedDropdownHandlers = ({
  setIsDropdownOpen,
}: RegisterClosedDropdownHandlersInput) => {
  const keyDownCallback = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Up':
      case 'ArrowUp':
      case 'Down':
      case 'ArrowDown':
      case ' ': // Space
      case 'Enter':
        e.preventDefault();
        setIsDropdownOpen(true);
    }
  };
  document.addEventListener('keydown', keyDownCallback);
  return () => {
    document.removeEventListener('keydown', keyDownCallback);
  };
};
type RegisterClosedDropdownHandlersInput = {
  setIsDropdownOpen: (v: boolean) => void;
};

export { registerClosedDropdownHandlers, registerOpenDropdownHandlers };
