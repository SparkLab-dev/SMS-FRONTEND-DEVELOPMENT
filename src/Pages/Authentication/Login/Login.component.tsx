import { FC, useState } from "react";

//style
import { FormName, LinkTo, StyledForm } from "App/style/App.style";
import {
  DontHaveAccountHold,
  InputsHolder,
  Paragraph,
} from "./style/Login.style";

//mui-icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

const Login: FC<{}> = () => {
  const [typePassword, setTypePassword] = useState(true);

  const changeIcon = () => {
    setTypePassword(!typePassword);
  };
  return (
    <>
      <StyledForm>
        <FormName>Log in</FormName>
        <InputsHolder>
          <GenericInput
            placeholder="Email"
            input_label="Email"
            required={true}
            type="text"
          />
          <GenericInput
            placeholder="Password"
            input_label="Password"
            required={true}
            type={typePassword ? "password" : "text"}
            onClickIcon={changeIcon}
            isPassword={true}
            passwordIcon={
              typePassword ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
          />
        </InputsHolder>
        <GenericButton name="Submit" />
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
