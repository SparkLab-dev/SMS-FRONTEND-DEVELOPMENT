import { FC, useState } from "react";

// style

import GenericInput from "GenericInput/GenericInput.component";
//mui-icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "Button/Button.component";
const App: FC<{}> = () => {
  const [typePassword, setTypePassword] = useState(true);

  const changeIcon = () => {
    setTypePassword(!typePassword);
  };
  return (
    <>
      <h1>Login</h1>
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
        passwordIcon={typePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      />
      <Button name="Submit" />
    </>
  );
};

export default App;
