import { ChangeEvent, FC } from "react";
import { EDefaultClassNames } from "../classNames";

import "./_style.scss";

// Типы Input as для поля type
export enum ETypeInput {
  text = "text",
}

interface IProps {
  className?: string;
  id?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type: ETypeInput;
  value?: string;
}

// Для работы компонента нужно передать хотя бы type & name, id в случае если его не передали автоматически будет равно name
const Input: FC<IProps> = ({
  className,
  name,
  id = name,
  onChange,
  placeholder,
  required = false,
  type,
  value,
}) => {
  return (
    <input
      className={className ? `${className} ${EDefaultClassNames.input}` : EDefaultClassNames.input}
      id={id}
      name={name}
      onChange={onChange ? (e: ChangeEvent<HTMLInputElement>): void => onChange(e) : undefined}
      required={required}
      type={type}
      {...(placeholder !== undefined && { placeholder })}
      {...(value !== undefined && { value })}
    />
  );
};

export default Input;
