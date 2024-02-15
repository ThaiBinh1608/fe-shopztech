import React, { useState, useCallback, useEffect } from "react";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import icons from "../../ultils/icons";
import { toast } from "react-toastify";
import { validate } from "../../ultils/helpers";
import { showModal } from "../../store/app/appSlice";
import { Loading, InputField, Button } from "../../components";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { AiFillCloseCircle } = icons;
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
    });
  };
  const [token, setToken] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [email, setEmail] = useState("");
  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  const [searchParams] = useSearchParams();

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.mes);
    } else {
      toast.error(response.mes);
    }
  };
  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, mobile, ...data } = payload;
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);

    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success === true) {
          setIsVerifiedEmail(true);
        } else {
          Swal.fire("Oops!!!", response.mes, "error");
        }
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          );
          searchParams.get("redirect")
            ? navigate(searchParams.get("redirect"))
            : navigate(`/${path.HOME}`);
        } else {
          Swal.fire("Oops!!!", rs.mes, "error");
          resetPayload();
        }
      }
    } else {
    }
  }, [payload, isRegister]);
  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success === true) {
      Swal.fire("Congratulation", response.mes, "success").then(() => {
        setIsRegister(false);
        setIsVerifiedEmail(false);
        resetPayload();
      });
    } else {
      Swal.fire("Oops!!!", response.mes, "error");
      setIsVerifiedEmail(false);
      setToken("");
    }
  };
  return (
    <div className="w-full h-screen relative  bg-gradient-to-b from-violet-400 to-sky-400 ">
      {isVerifiedEmail && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay flex items-center justify-center py-8 z-50">
          <div className="w-[50%] h-[50%] max-sm:w-full max-sm:h-full p-8 bg-white rounded-3xl border-2 shadow-2xl">
            <div className="flex flex-col">
              <h3 className="text-[18px] text-red-500 ">
                Kiểm tra email của bạn để lấy code hoàn tất đăng ký tài
                khoản,code sẽ hết hạn sau 5 phút
              </h3>
              <input
                type="text"
                className="px-4 py-3 my-6 rounded-l-full  rounded-r-full  border-2 border-gray-400  outline-none w-full  focus:shadow-xl  "
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <Button handleOnClick={finalRegister}>Submit</Button>
            </div>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center py-8 z-50">
          <div className="w-[50%] h-[50%] max-sm:w-full max-sm:h-full  p-8 bg-white rounded-3xl border-2 shadow-2xl">
            <div className="flex flex-col">
              <div className=" flex justify-end">
                <AiFillCloseCircle
                  size={42}
                  onClick={() => setIsForgotPassword(false)}
                  className="text-violet-700"
                ></AiFillCloseCircle>
              </div>
              <label htmlFor="email">Nhập email của bạn:</label>
              <input
                type="text"
                id="email"
                className="px-4 py-3 my-6 rounded-l-full  rounded-r-full  border-2 border-gray-400  outline-none w-full  focus:shadow-xl  "
                placeholder="VD: abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <Button handleOnClick={handleForgotPassword}>Submit</Button>
            </div>
          </div>
        </div>
      )}
      <div className=" w-full h-screen flex items-center justify-center ">
        <div className="p-8 bg-white flex flex-col items-center justify-center rounded-3xl w-[50%] max-sm:w-full max-sm:h-full  border-2 shadow-2xl">
          <span className="text-[24px] font-semibold flex  items-center justify-center mb-8">
            {isRegister ? "Register" : "Login"}
          </span>
          {isRegister && (
            <div className="flex w-full gap-2 items-center">
              <InputField
                value={payload.firstName}
                setValue={setPayload}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                nameKey="firstName"
                fullwidth
                labelText
              ></InputField>
              <InputField
                value={payload.lastName}
                setValue={setPayload}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                nameKey="lastName"
                fullwidth
                labelText
              ></InputField>
            </div>
          )}

          <InputField
            value={payload.email}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            nameKey="email"
            fullwidth
            labelText
          ></InputField>
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              nameKey="mobile"
              fullwidth
              labelText
            ></InputField>
          )}

          <InputField
            value={payload.password}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            nameKey="password"
            type="password"
            fullwidth
            labelText
          ></InputField>
          <Button handleOnClick={handleSubmit} fw>
            {isRegister ? "Register" : "Login"}
          </Button>
          <div className="flex w-full items-center justify-between my-2 cursor-pointer">
            {!isRegister && (
              <span
                className="text-[18px] text-violet-600 hover:underline"
                onClick={() => setIsForgotPassword(true)}
              >
                Quên mật khẩu?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-[18px] text-violet-600 hover:underline"
                onClick={() => setIsRegister(true)}
              >
                Tạo tài khoản
              </span>
            )}

            {isRegister && (
              <span
                className="text-[18px] text-violet-600 hover:underline w-full text-center"
                onClick={() => setIsRegister(false)}
              >
                Đã có tài khoản?
              </span>
            )}
          </div>
          <Link
            className="  hover:underline  text-[18px] text-violet-600 text-center"
            to={`/${path.HOME}`}
          >
            Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
