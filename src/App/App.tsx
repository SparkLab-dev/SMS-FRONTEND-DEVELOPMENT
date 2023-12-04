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
import ProductsTable from "Components/ProductsTable/ProductsTable.component";
import OrdersTable from "Components/OrdersTable/OrdersTable.component";
import OrderForm from "Containers/OrderForm/OrderForm.component";
import UserProfile from "Pages/UserProfile/UserProfile.component";

const App: FC<{}> = () => {
  const logoProps = {
    profilePhoto: "example_photo_url",
    profilePhotoType: "example_type",
    reload: true,
    sendPhoto: (file: File) => {
    },
  };
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
            <Route path="/shopcategory/:categoryId" element={<ShopCategory />} />
            <Route path="/product/:id" element={<Product />} />
            <Route
              path="/productForm"
              element={<ProductForm {...logoProps} />}
            />
            <Route path="/table" element={<ProductsTable />} />
            <Route path="/orderTable" element={<OrdersTable />} />
            <Route path="/orderForm" element={<OrderForm />} />
            <Route path="/userProfile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
