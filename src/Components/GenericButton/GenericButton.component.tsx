import { FC } from "react";

//style
import { ButtonCont, ButtonHolder } from "./style/GenericButton.style";

interface ButtonProps {
  name?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: any;
  value?: string;
}
const GenericButton: FC<ButtonProps> = (props) => {
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
export default GenericButton;
