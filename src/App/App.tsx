import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// style

//components
import Login from "Pages/Authentication/Login/Login.component";
import Register from "Pages/Authentication/Register/Register.component";

const App: FC<{}> = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
