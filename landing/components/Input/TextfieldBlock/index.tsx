import Textfield from "../Textfield";

type TextfieldBlockProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  inputType?: string;
  placeholder: string;
};

function TextfieldBlock({
  id,
  name,
  label,
  type = "input",
  inputType = "text",
  placeholder,
}: TextfieldBlockProps) {
  return (
    <div className="flex flex-col items-start justify-start w-full gap-4 text-left">
      <label
        className="text-lg font-medium text-white font-avenir"
        htmlFor={name}
      >
        {label}
      </label>
      <Textfield
        id={id}
        type={type}
        name={name}
        inputType={inputType}
        placeholder={placeholder}
        className=""
      />
    </div>
  );
}

export default TextfieldBlock;
