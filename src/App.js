import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Blog,
  FAQ,
  DetailProduct,
  Service,
  Products,
  FinalRegister,
  ResetPassword,
  DetailCart,
} from "./pages/public";
import {
  Adminlayout,
  Dashboard,
  ManageProducts,
  ManageOrder,
  ManageUser,
  CreateProduct,
} from "./pages/admin";
import {
  MenberLayout,
  Personal,
  History,
  Carts,
  Wishlist,
  Checkout,
} from "./pages/menber";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cart, Modal } from "./components";
import { showCart } from "./store/app/appSlice";
function App() {
  const dispath = useDispatch();
  const { isShowModal, modalChildren, isShowCart } = useSelector(
    (state) => state.app
  );
  useEffect(() => {
    dispath(getCategories());
  }, []);
  return (
    <div className="w-full font-main relative">
      {isShowCart && (
        <div
          onClick={() => dispath(showCart())}
          className="absolute inset-0 bg-overlay z-50 flex justify-end"
        >
          <Cart></Cart>
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}

      <Routes>
        <Route path={path.LOGIN} element={<Login></Login>}></Route>
        <Route
          path={path.FINAL_REGISTER}
          element={<FinalRegister></FinalRegister>}
        ></Route>
        <Route path={path.ADMIN} element={<Adminlayout></Adminlayout>}>
          <Route
            path={path.DASHBOARD}
            element={<Dashboard></Dashboard>}
          ></Route>
          <Route
            path={path.CREATE_PRODUCT}
            element={<CreateProduct></CreateProduct>}
          ></Route>
          <Route
            path={path.MANAGE_PRODUCTS}
            element={<ManageProducts></ManageProducts>}
          ></Route>
          <Route
            path={path.MANAGE_ORTHER}
            element={<ManageOrder></ManageOrder>}
          ></Route>
          <Route
            path={path.MANAGE_USER}
            element={<ManageUser></ManageUser>}
          ></Route>
        </Route>
        <Route path={path.MEMBER} element={<MenberLayout />}>
          <Route path={path.PERSONAL} element={<Personal></Personal>}></Route>
          <Route path={path.CARTS} element={<DetailCart></DetailCart>}></Route>
          <Route path={path.WISHLIST} element={<Wishlist></Wishlist>}></Route>
          <Route path={path.HISTORY} element={<History></History>}></Route>
        </Route>
        <Route path={path.CHECKOUT} element={<Checkout></Checkout>}></Route>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.ALL} element={<Home></Home>}></Route>
          <Route path={path.HOME} element={<Home></Home>}></Route>
          <Route
            path={path.PRODUCTS__CATEGORY}
            element={<Products></Products>}
          ></Route>
          <Route
            path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE}
            element={<DetailProduct></DetailProduct>}
          ></Route>
          <Route path={path.BLOGS} element={<Blog></Blog>}></Route>
          <Route path={path.FAQ} element={<FAQ></FAQ>}></Route>
          <Route path={path.OUR_SERVICES} element={<Service></Service>}></Route>
          <Route
            path={path.RESET_PASSWORD}
            element={<ResetPassword></ResetPassword>}
          ></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
