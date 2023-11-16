import { FC } from "react";

// style
import { Input } from "./style/App.style";

const App: FC<{}> = () => {
  return (
    <>
      <Input
        placeholder="Firstname"
        type="text"
        fontSize="12px"
        borderbottomrightradius="20px"
        bordertoprightradius="20px"
        border="none"
        width="100%"
        height="45px"
        backgroundcolor="#FFFFFF"
        borderradius="10px"
        paddingleft="5px"
        padding="0 10px"
        margin=" 5px 0 15px 0px"
        required={true}
      />
    </>
  );
};

export default App;
