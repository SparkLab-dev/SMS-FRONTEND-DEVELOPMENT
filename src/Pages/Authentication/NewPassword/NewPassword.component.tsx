import { FC, useState } from "react";

//style
import { NewPassInputsHolder } from "./style/NewPassword.style";
import { FormName, StyledForm } from "App/style/App.style";

//mui-icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import GenericInput from "Components/GenericInput/GenericInput.component";

const NewPassword: FC<{}> = () => {
  const [newPassword, setNewPassword] = useState(true);
  const [confirmNewPassword, setConfirmNewPassword] = useState(true);
  const changeIcon = () => {
    setNewPassword(!newPassword);
  };
  const changeConfirmNewPasswordIcon = () => {
    setConfirmNewPassword(!confirmNewPassword);
  };
  return (
    <>
      <StyledForm>
        <FormName>New Password</FormName>
        <NewPassInputsHolder>
          <GenericInput
            placeholder="New Password"
            input_label="New Password"
            required={true}
            type={newPassword ? "password" : "text"}
            onClickIcon={changeIcon}
            isPassword={true}
            passwordIcon={
              newPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
          />
          <GenericInput
            placeholder="Confirm Password"
            input_label="Confirm Password"
            required={true}
            type={confirmNewPassword ? "password" : "text"}
            onClickIcon={changeConfirmNewPasswordIcon}
            isPassword={true}
            passwordIcon={
              confirmNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
          />
        </NewPassInputsHolder>
        <GenericButton name="Submit" />
      </StyledForm>
    </>
  );
};

export default NewPassword;
