interface TextLg {
  text: string
}

export const TextLg = ({ text }: TextLg) => {
  return(
    <div className="w-full">
      <h1 className="text-lg font-bold break-words">{text}</h1>
    </div>
  );
}