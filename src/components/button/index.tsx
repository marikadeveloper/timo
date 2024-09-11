import './styles.scss';

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className='button'
      onClick={onClick}>
      {children}
    </button>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default Button;
