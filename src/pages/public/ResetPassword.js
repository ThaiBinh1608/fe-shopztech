import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";
import { Button } from "../../components";
const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      toast.success(response.mes);
    } else {
      toast.error(response.mes);
    }
  };
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-violet-400 to-sky-400 flex items-center justify-center py-8 z-50">
      <div className="w-[50%] h-[50%] bg-white p-8 rounded-3xl border-2 shadow-2xl">
        <div className="flex flex-col">
          <label htmlFor="email">Nhập mật khẩu mới của bạn:</label>
          <input
            type="text"
            id="password"
            className="px-4 py-3 my-6 rounded-l-full  rounded-r-full  border-2 border-gray-400  outline-none w-full  focus:shadow-xl  "
            placeholder="VD: 123456789"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button name="submit" handleOnClick={handleResetPassword}></Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
