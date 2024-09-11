import './styles.scss';

function UnstyledButton({ children, ...props }: UnstyledButtonProps) {
  return (
    <button
      className='unstyled-button'
      {...props}>
      {children}
    </button>
  );
}

type UnstyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default UnstyledButton;
