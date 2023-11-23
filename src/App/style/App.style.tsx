import styled from "styled-components";

//react-router-dom
import { Link } from "react-router-dom";
import { ChangeEvent, RefObject } from "react";

//outlet
export const Page = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  background: "#FFFF";
`;

//generic dropdown
interface dropdownProps {
  label?: string;
  id?: string;
  type?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFocus?: () => void;
  handleSelectDropdown?: () => void;
  placeholder?: string;
  value?: string;
  inputRef?: RefObject<HTMLInputElement>;
  pattern?: string;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
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
export const StyledSelect = styled.select<dropdownProps>`
  font-family: ${(props: any) => props.fontFamily || "Poppins"};
  font-weight: ${(props: any) => props.fontWeight || "400"};
  outline: none;
  box-sizing: border-box;
  border: ${(props: any) => props.border || "1.5px solid #cfdeff"};
  width: ${(props: any) => props.width || "100%"};
  height: ${(props: any) => props.height || "55px"};
  background: ${(props: any) => props.backgroundcolor || "#FFFFFF"};
  border-radius: ${(props: any) => props.borderradius || "10px"};
  font-size: ${(props: any) => props.fontSize || "12px"};
  padding-left: ${(props: any) => props.paddingleft};
  padding: ${(props: any) => props.padding || "10px"};
  margin-top: 12px;
  margin: ${(props: any) => props.margin};
`;
export const LabelDescriptionContainer = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #43546f;
  margin: 23px 0 0px 0;
  padding-left: 15px;
  text-align: left;
`;

//form
interface FormProps {
  height?: string;
  onSubmit?: any;
  //  (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}
export const StyledForm = styled.form<FormProps>`
  width: 100%;
  max-width: 800px;
  margin: auto;
`;

export const FormName = styled.h1`
  font-family: "Poppins";
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 55px;
  line-height: 70px;
  color: #43546f;
`;

//Link
export const LinkTo = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 15px;
  font-family: "Poopins";
`;

//button
export const ButtonHolder = styled.div`
  width: 100%;
  max-width: 300px;
  margin: auto;
`;

export const Warning = styled.p`
  color: red;
  font-family: "Poppins";
  font-size: 11px;
  text-align: left;
  margin: 0;
  font-weight: 600;
`;
//generic input
// interface InputProps {
//   label?: string;
//   id?: string;
//   type?: string;
//   name?: string;
//   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
//   handleFocus?: () => void;
//   placeholder?: string;
//   value?: string;
//   inputRef?: RefObject<HTMLInputElement>;
//   pattern?: string;
//   readOnly?: boolean;
//   required?: boolean;
//   disabled?: boolean;
//   fontFamily?: string;
//   fontWeight?: string;
//   bordertoprightradius?: string;
//   borderbottomrightradius?: string;
//   width?: string;
//   height?: string;
//   fontSize?: string;
//   paddingleft?: string;
//   backgroundcolor?: string;
//   border?: string;
//   borderradius?: string;
//   padding?: string;
//   margin?: string;
// }
// export const Input = styled.input<InputProps>`
//   font-family: ${(props: any) => props.fontFamily || "Poppins"};
//   font-weight: ${(props: any) => props.fontWeight || 400};
//   outline: none;
//   box-sizing: border-box;
//   border: ${(props: any) => props.border || "1.5px solid #cfdeff"};
//   width: ${(props: any) => props.width || "100%"};
//   height: ${(props: any) => props.height || "55px"};
//   background: ${(props: any) => props.backgroundcolor || "#FFFFFF"};
//   border-radius: ${(props: any) => props.borderradius || "10px"};
//   font-style: "normal";
//   font-size: ${(props: any) => props.fontSize || "12px"};
//   padding-left: ${(props: any) => props.paddingleft};
//   padding: ${(props: any) => props.padding || "10px"};
//   margin: ${(props: any) => props.margin};
//   margin-top: 12px;
// `;

//generic password input
// export const PasswordInput = styled.input`
//   font-family: ${(props: any) => props.fontFamily || "Poppins"};
//   font-weight: ${(props: any) => props.fontWeight || 400};
//   outline: none;
//   box-sizing: border-box;
//   border: ${(props: any) => props.border || "1.5px solid #cfdeff"};
//   width: ${(props: any) => props.width || "100%"};
//   height: ${(props: any) => props.height || "55px"};
//   background: ${(props: any) => props.backgroundcolor || "#FFFFFF"};
//   border-radius: ${(props: any) => props.borderradius || "10px"};
//   font-style: "normal";
//   font-size: ${(props: any) => props.fontSize || "12px"};
//   padding-left: ${(props: any) => props.paddingleft};
//   padding: ${(props: any) => props.padding || "0 10px"};
//   margin: ${(props: any) => props.margin || " 5px 0 15px 0px"};
//   position: relative;
//   margin-top: 12px;
//   &.eye-icon {
//     position: absolute;
//     right: 10px;
//     top: 50%;
//     transform: translateY(-50%);
//     cursor: pointer;
//   }
// `;
// export const InputGroup = styled.div`
//   position: relative;
// `;
// export const ToggleButton = styled.button`
//   position: absolute;
//   top: 50%;
//   right: 10px;
//   transform: translateY(-50%);
//   border: none;
//   background: none;
//   cursor: pointer;
//   padding: 0;
//   outline: none;
//   user-select: none;
// `;

//generic button
// interface ButtonProps {
//   h?: string;
//   w?: string;
//   borderradius?: string;
//   fontFamily?: string;
//   fontSize?: string;
//   fontWeight?: string;
//   marginTop?: string;
//   margin?: string;
//   onClick?: any;
//   padding?: string;
//   // (
//   //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   // ) => void | Promise<void>;

//   disabled?: boolean;
// }
// export const Button = styled.button<ButtonProps>`
//   box-sizing: border-box;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   text-transform: capitalize;
//   cursor: pointer;
//   transition: 0.2s;
//   height: ${(props: any) => props.h || "100%"};
//   width: ${(props: any) => props.w || "100%"};
//   color: ${(props: any) => props.color || "#FFFF"};
//   background-color: ${(props: any) => props.background || "#0E53C5"};
//   border: ${(props: any) => props.border || "#323fb6"};
//   border-radius: ${(props: any) => props.borderradius || "10px"};
//   text-decoration: none;
//   font-family: ${(props: any) => props.fontFamily || "Poppins"};
//   font-size: ${(props: any) => props.fontSize || "16px"};
//   font-weight: ${(props: any) => props.fontWeight || "600"};
//   margin-top: ${(props: any) => props.marginTop || "32px"};
//   padding: ${(props: any) => props.padding || "15px 0px"};
//   /* margin: ${(props: any) => props.margin || "25px 0 0 0"}; */

//   &:hover:not(:disabled),
//   &:active:not(:disabled),
//   &:hover {
//     outline: 0;
//     color: ${(props: any) => props.color || "#0E53C5"};
//     background: ${(props: any) => props.background || "#CFDEFF"};
//     border: ${(props: any) => props.border || 0};
//     border-radius: ${(props: any) => props.borderRadius || "10px"};
//     cursor: pointer;
//   }
//   &:disabled {
//     opacity: 0.6;
//     filter: saturate(60%);
//   }
// `;

// export const PhoneHolder = styled.div`
//   display: block;
//   width: 100%;
//   height: 100%;
// `;
// export const PhoneInputHold = styled(PhoneInput)`
//   max-width: 100%;
//   column-gap: 15px;
//   border-radius: 10px;
//   font-weight: 700;
//   outline: none !important;
//   box-sizing: border-box;
//   border: none;
//   width: 100%;
//   height: 50px;
//   background: #ffffff;
//   /* border: 1px solid #cfdeff; */
//   font-family: "Poppins";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 12px;
//   line-height: 16px;
//   &.react-tel-input .form-control {
//     padding: 10.5px 14px 18.5px 60px !important;
//     border: none;
//     outline: none !important;
//     border-color: transparent !important;
//     box-shadow: none !important;
//     width: 100%;
//   }

//   & .react-tel-input .selected-flag.open {
//     border: none !important;
//     box-shadow: none !important;
//   }
//   &.form-control:hover,
//   .form-control:focus {
//     border: none !important;
//     box-shadow: none !important;
//     background: none !important;
//   }

//   &.user-profile input.form-control {
//     border: none !important;
//     outline: none !important;
//     height: 50px;
//     max-width: 90%;
//     background: none;
//   }
// `;

// export const Asterik = styled.span`
//   color: #fc0101;
//   font-weight: bold;
//   font-family: "Poppins";
// `;
