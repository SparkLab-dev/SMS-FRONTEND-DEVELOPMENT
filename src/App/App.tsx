import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// style

//components
import Login from "Pages/Authentication/Login/Login.component";
import Register from "Pages/Authentication/Register/Register.component";
import NewPassword from "Pages/Authentication/NewPassword/NewPassword.component";
import OutletPage from "Components/Outletpage/Outletpage.component";
import ResetPassword from "Pages/Authentication/ResetPassword/ResetPassword.component";
import ForgotPassword from "Pages/Authentication/ForgotPassword/ForgotPassword.component";


const App: FC<{}> = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OutletPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
