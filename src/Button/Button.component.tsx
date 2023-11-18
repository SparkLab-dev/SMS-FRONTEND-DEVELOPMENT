import { FC } from "react";
import { ButtonCont, ButtonHolder } from "./style/Button.style";

interface ButtonProps {
  name?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: (value?: string) => void;
  value?: string;
}
const Button: FC<ButtonProps> = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.value);
    }
  };
  return (
    <>
      <ButtonHolder>
        <ButtonCont
          onClick={handleClick}
          type={props.type}
          disabled={props.disabled}
        >
          {props.name}
        </ButtonCont>
      </ButtonHolder>
    </>
  );
};
export default Button;
