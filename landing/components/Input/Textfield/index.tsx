interface TextfieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  name: string;
  placeholder: string;
  type?: string;
  inputType?: string;
  className?: string;
}

function Textfield({
  id,
  name,
  placeholder,
  type = "input",
  inputType = "text",
  className = "",
  ...rest
}: TextfieldProps) {
  const _className =
    "w-full px-4 py-3 text-white border rounded-md bg-white/10 border-white/60 placeholder:text-white/70 font-avenir " +
    className;

  switch (type) {
    case "input":
      return (
        <input
          id={id}
          name={name}
          className={_className + " max-h-[50px]"}
          type={inputType!}
          placeholder={placeholder}
          {...rest}
        />
      );
    case "textarea":
      return (
        <textarea
          id={id}
          name={name}
          rows={4}
          className={_className}
          placeholder={placeholder}
          {...rest}
        />
      );
    default:
      return (
        <input
          id={id}
          name={name}
          className={_className + " max-h-[50px]"}
          type={inputType!}
          placeholder={placeholder}
          {...rest}
        />
      );
  }
}

export default Textfield;
