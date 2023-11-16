import styled from "styled-components";
interface GenericInputProps {
  divWidth?: string;
  input_label_style?: string;
  input_label?: string;
  asterik?: string;
  className_input_icon?: string;
  showIcon?: number;
  icon?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  id?: string;
  type?: string;
  name?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleFocus?: React.FocusEventHandler<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  value?: string;
  pattern?: string;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  isCenter?: boolean;
  centerIcon?: string;
  isPassword?: boolean;
  passwordIcon?: string;
  onClickIcon?: (value: string) => void;
  fontFamily?: string;
  fontWeight?: string;
  bordertoprightradius?: string;
  borderbottomrightradius?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  paddingleft?: string;
  backgroundcolor?: string;
  border?: string;
  borderradius?: string;
  padding?: string;
  margin?: string;
}

export const Input = styled.input<GenericInputProps>`
  font-family: ${(props: any) => props.fontFamily || "Poppins"};
  font-weight: ${(props: any) => props.fontWeight};
  border-top-right-radius: ${(props: any) =>
    props.bordertoprightradius || "20px"};
  border-bottom-right-radius: ${(props: any) =>
    props.borderbottomrightradius || "20px"};
  outline: none;
  box-shadow: 0 0 2em #e6e9f9;
  box-sizing: border-box;
  border: ${(props: any) => props.border};
  width: ${(props: any) => props.width || "100%"};
  height: ${(props: any) => props.height || "100%"};
  background: ${(props: any) => props.backgroundcolor || "#FFFFFF"};
  border-left: "2px solid red";
  border-radius: ${(props: any) => props.borderradius || "20px"};
  font-style: "normal";
  font-size: ${(props: any) => props.fontSize || "12px"};
  padding-left: ${(props: any) => props.paddingleft};
  padding: ${(props: any) => props.padding};
  margin-top: 12px;
  display: block;
  margin: ${(props: any) => props.margin};
`;