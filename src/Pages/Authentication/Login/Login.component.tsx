import { FC, useState } from "react";

//style
import {
  Button,
  ButtonHolder,
  FormName,
  Input,
  InputGroup,
  LabelDescriptionContainer,
  LinkTo,
  PasswordInput,
  StyledForm,
  ToggleButton,
} from "App/style/App.style";
import {
  DontHaveAccountHold,
  InputsHolder,
  Paragraph,
} from "./style/Login.style";

//mui-icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login: FC<{}> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <StyledForm>
        <FormName>Log in</FormName>
        <InputsHolder>
          <LabelDescriptionContainer>Email</LabelDescriptionContainer>
          <Input placeholder="Email" type="email" />
          <LabelDescriptionContainer>Password</LabelDescriptionContainer>
          <InputGroup>
            <PasswordInput
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />
            <ToggleButton type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </ToggleButton>
          </InputGroup>
        </InputsHolder>
        <ButtonHolder>
          <Button>Login</Button>
        </ButtonHolder>
        <DontHaveAccountHold>
          <Paragraph>Don't have an account?</Paragraph>
          <LinkTo to="/register">
            <Paragraph>Register!</Paragraph>
          </LinkTo>
        </DontHaveAccountHold>
      </StyledForm>
    </>
  );
};

export default Login;
