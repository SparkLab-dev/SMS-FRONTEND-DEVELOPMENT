import { FC } from "react";

//style
import { FormName, StyledForm } from "App/style/App.style";
import { EmailParagraph, Text } from "./style/ForgotPassword.style";
import { ResetPassInputsHolder } from "../ResetPassword/style/ResetPassword.style";

//components
import GenericInput from "Components/GenericInput/GenericInput.component";
import GenericButton from "Components/GenericButton/GenericButton.component";

const ForgotPassword: FC<{}> = () => {
  return (
    <>
      <StyledForm>
        <FormName>Forgot Password</FormName>
        <Text>Please, enter your Email!</Text>
        <EmailParagraph>
          We will send a link to your Email address!
        </EmailParagraph>
        <ResetPassInputsHolder>
          <GenericInput
            placeholder="Email"
            input_label="Email"
            required={true}
            type="text"
          />
        </ResetPassInputsHolder>
        <GenericButton name="submit" />
      </StyledForm>
    </>
  );
};

export default ForgotPassword;
