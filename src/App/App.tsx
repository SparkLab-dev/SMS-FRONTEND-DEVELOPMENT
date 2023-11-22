import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Login from "Pages/Authentication/Login/Login.component";
import Register from "Pages/Authentication/Register/Register.component";
import NewPassword from "Pages/Authentication/NewPassword/NewPassword.component";
import OutletPage from "Components/Outletpage/Outletpage.component";
import ResetPassword from "Pages/Authentication/ResetPassword/ResetPassword.component";
import ForgotPassword from "Pages/Authentication/ForgotPassword/ForgotPassword.component";
import Home from "Pages/Home/Home.component";
import ShopCategory from "Pages/ShopCategory/ShopCategory.component";
import Product from "Pages/Product/Product.component";
import ProductForm from "Containers/ProductForm/ProductForm.component";

const App: FC<{}> = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OutletPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="auth/sms/registration/:token"
              element={<NewPassword />}
            />
            <Route
              path="/SMS/resetPassword/:token"
              element={<ResetPassword />}
            />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shopcategory/:id" element={<ShopCategory />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/productForm" element={<ProductForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
