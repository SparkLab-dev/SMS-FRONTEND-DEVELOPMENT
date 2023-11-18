import { FC } from "react";

//style
import {
  FormName,
  LabelDescriptionContainer,
  LinkTo,
  StyledForm,
  StyledSelect,
} from "App/style/App.style";
import {
  InputContainer,
  InputsHolder,
  RegParagraph,
  RegisterDontHaveAccountHold,
} from "./style/Register.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

const Register: FC<{}> = () => {
  return (
    <>
      <StyledForm>
        <FormName>Register</FormName>
        <InputsHolder>
          <InputContainer>
            <GenericInput
              placeholder="Firstname"
              input_label="FirstName"
              required={true}
              type="text"
            />
          </InputContainer>
          <InputContainer>
            <GenericInput
              placeholder="Lastname"
              input_label="LastName"
              required={true}
              type="text"
            />
          </InputContainer>
        </InputsHolder>
        <InputsHolder>
          <InputContainer>
            <GenericInput
              placeholder="Email"
              input_label="Email"
              required={true}
              type="text"
            />
          </InputContainer>
          <InputContainer>
            <GenericInput
              placeholder="Phone number"
              input_label="Phone Number"
              required={true}
              type="number"
            />
          </InputContainer>
        </InputsHolder>
        <InputsHolder>
          <InputContainer>
            <GenericInput input_label="Birthday" required={true} type="date" />
          </InputContainer>
          <InputContainer>
            <GenericInput
              placeholder="Location"
              input_label="Location"
              required={true}
              type="text"
            />
          </InputContainer>
        </InputsHolder>
        <InputContainer>
          <LabelDescriptionContainer>Role</LabelDescriptionContainer>
          <StyledSelect />
        </InputContainer>
        <GenericButton name="Submit" />
        <RegisterDontHaveAccountHold>
          <RegParagraph>Already have an account?</RegParagraph>
          <LinkTo to="/">
            <RegParagraph>Login!</RegParagraph>
          </LinkTo>
        </RegisterDontHaveAccountHold>
      </StyledForm>
    </>
  );
};

export default Register;
