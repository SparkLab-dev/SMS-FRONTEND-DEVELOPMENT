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

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import { UserLogin } from "redux/Authentication/Login/LoginSlice";

const Login: FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [typePassword, setTypePassword] = useState(true);

  const dispatch: AppDispatch = useDispatch();

  //login call
  const handleLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const userCredentials = {
      email: email || "",
      password: password || "",
    };

    console.log(typeof userCredentials);
    await dispatch(UserLogin(userCredentials));
  };

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
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
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
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </InputsHolder>

        <GenericButton name="Submit" onClick={handleLoginClick} />
        <DontHaveAccountHold>
          <Paragraph>Create an account? </Paragraph>
          <LinkTo to="/register">
            <Paragraph>Click here!</Paragraph>
          </LinkTo>
        </DontHaveAccountHold>
      </StyledForm>
    </>
  );
};

export default Login;
