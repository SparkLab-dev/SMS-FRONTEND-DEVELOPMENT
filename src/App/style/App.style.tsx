import styled from "styled-components";

//react-router-dom
import { Link } from "react-router-dom";
import { RefObject } from "react";

//outlet
export const Page = styled.div`
  /* width: 100%; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: #e5e5e5; */
  background-color: #0064660a;
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
  marginTop?: string;
}
export const StyledSelect = styled.select<dropdownProps>`
  font-family: ${(props: any) => props.fontFamily || "Poppins"};
  font-weight: ${(props: any) => props.fontWeight || "400"};
  outline: none;
  box-sizing: border-box;
  border: ${(props: any) => props.border || "none"};
  width: ${(props: any) => props.width || "100%"};
  height: ${(props: any) => props.height || "53px"};
  background: ${(props: any) => props.backgroundcolor || "#FFFFFF"};
  border-radius: ${(props: any) => props.borderradius || "10px"};
  font-size: ${(props: any) => props.fontSize || "12px"};
  padding-left: ${(props: any) => props.paddingleft};
  padding: ${(props: any) => props.padding || "10px"};
  margin: ${(props: any) => props.margin};
  margin-top: ${(props: any) => props.marginTop};
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(209, 209, 214, 1.5);
  border: none;
`;
export const LabelDescriptionContainer = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #43546f;
  margin: 18px 0 8px 0;
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
  max-width: 450px;
  margin: auto;
  /* box-shadow: 3px 3px 15px 5px rgba(0, 0, 0, 0.04);
  border-radius: 30px;
  padding: 10px 20px; */
`;

export const FormName = styled.h1`
  font-family: "Poppins";
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 55px;
  line-height: 70px;
  color: #43546f;
  @media screen and (max-width: 1000px) {
    font-size: 50px;
  }
`;

//Link
export const LinkTo = styled(Link)`
  text-decoration: none;
  color: #444444;
  font-weight: 600;
  font-size: 15px;
  font-family: "Poopins";
  padding-left: 4px;
  :hover {
    font-weight: bold;
  }
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
