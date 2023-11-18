import { FC, useState } from "react";
//style
import { AllPage, NewPaswordForm } from "./style/NewPassword.style";
import {
  Button,
  ButtonHolder,
  FormName,
  InputGroup,
  LabelDescriptionContainer,
  PasswordInput,
  ToggleButton,
} from "App/style/App.style";

//mui-icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const NewPassword: FC<{}> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <AllPage>
        <NewPaswordForm>
          <FormName>New Password</FormName>
          <LabelDescriptionContainer>New Password</LabelDescriptionContainer>
          <InputGroup>
            <PasswordInput
              placeholder="New password"
              type={showPassword ? "text" : "password"}
            />
            <ToggleButton type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </ToggleButton>
          </InputGroup>
          <LabelDescriptionContainer>
            Confirm Password
          </LabelDescriptionContainer>
          <InputGroup>
            <PasswordInput
              placeholder="Confirm password"
              type={showPassword ? "text" : "password"}
            />
            <ToggleButton type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </ToggleButton>
          </InputGroup>
          <ButtonHolder>
            <Button>Submit</Button>
          </ButtonHolder>
        </NewPaswordForm>
      </AllPage>
    </>
  );
};

export default NewPassword;
