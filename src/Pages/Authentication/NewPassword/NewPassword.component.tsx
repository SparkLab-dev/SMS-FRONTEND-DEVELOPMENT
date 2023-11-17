import { FC } from "react";
import { AllPage, NewPaswordForm } from "./style/NewPassword.style";
import { FormName } from "App/style/App.style";

const NewPassword: FC<{}> = () => {
  return (
    <>
      <AllPage>
        <NewPaswordForm>
          <FormName>New Password</FormName>
        </NewPaswordForm>
      </AllPage>
    </>
  );
};

export default NewPassword;
