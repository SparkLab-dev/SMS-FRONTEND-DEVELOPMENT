import { FC } from "react";
//style
import {
  Button,
  FormName,
  Input,
  LabelDescriptionContainer,
  LinkTo,
  StyledForm,
  StyledSelect,
} from "App/style/App.style";
import {
  InputContainer,
  InputsHolder,
  RegParagraph,
  RegisterButtonHolder,
  RegisterDontHaveAccountHold,
} from "./style/Register.style";

const Register: FC<{}> = () => {
  return (
    <>
      <StyledForm>
        <FormName>Register</FormName>
        <InputsHolder>
          <InputContainer>
            <LabelDescriptionContainer>FirstName</LabelDescriptionContainer>
            <Input placeholder="Firstname" type="text" />
          </InputContainer>
          <InputContainer>
            <LabelDescriptionContainer>LastName</LabelDescriptionContainer>
            <Input placeholder="Lastname" type="text" />
          </InputContainer>
        </InputsHolder>
        <InputsHolder>
          <InputContainer>
            <LabelDescriptionContainer>Email</LabelDescriptionContainer>
            <Input placeholder="Email" type="email" />
          </InputContainer>
          <InputContainer>
            <LabelDescriptionContainer>Phone Number</LabelDescriptionContainer>
            <Input placeholder="Phone number" type="number" />
          </InputContainer>
        </InputsHolder>
        <InputsHolder>
          <InputContainer>
            <LabelDescriptionContainer>Birthday</LabelDescriptionContainer>
            <Input placeholder="Birthday" type="date" />
          </InputContainer>
          <InputContainer>
            <LabelDescriptionContainer>Location</LabelDescriptionContainer>
            <Input placeholder="Location" type="text" />
          </InputContainer>
        </InputsHolder>
        <LabelDescriptionContainer>Role</LabelDescriptionContainer>
        <StyledSelect />
        <RegisterButtonHolder>
          <Button>Register</Button>
        </RegisterButtonHolder>
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
