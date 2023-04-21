import { ChangeEvent } from "react";

interface FormProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value: string
}

export const Form = ({ onChange, placeholder, value }: FormProps) => {
  return(
    <form className="pt-2">
      <input 
        type="text"
        value={value}
        placeholder={placeholder} 
        className="border-2 border-black w-full px-2 rounded-md" 
        onChange={(event) => onChange(event)}
      />  
    </form>
  );
}