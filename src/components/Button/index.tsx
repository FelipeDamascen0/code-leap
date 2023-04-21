interface ButtonProps {
  onClick: () => void,
  text?: string,
  disabled?: boolean
}

export const Button = ({ onClick, text, disabled }: ButtonProps) => {
  return(
    <button 
      className="bg-[#7695EC] px-8 rounded-md font-bold" 
      onClick={onClick}
      disabled={disabled}
    >
      { text }
    </button>
  );
}