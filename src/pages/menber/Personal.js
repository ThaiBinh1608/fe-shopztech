import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";

import avatar from "../../assets/images/avatar.jpg";
import { apiUpdateCurrent } from "../../apis";
import { toast } from "react-toastify";
import { getCurrent } from "../../store/user/asyncAction";
import { showModal } from "../../store/app/appSlice";
const Personal = () => {
  const {
    register,
    formState: { errors, isDirty },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const { current } = useSelector((state) => state.user);
  const disPath = useDispatch();
  useEffect(() => {
    reset({
      firstName: current?.firstName,
      lastName: current?.lastName,
      email: current?.email,
      mobile: current?.mobile,
      avatar: current?.avatar,
      address: current?.address,
    });
  }, [current]);
  const handleUpdateInfo = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    disPath(
      showModal({ isShowModal: true, modalChildren: <Loading></Loading> })
    );
    const response = await apiUpdateCurrent(formData);
    disPath(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      disPath(getCurrent());
      toast.success(response.mes);
    } else toast.error(response.mes);
  };

  return (
    <div className="w-full bg-slate-200">
      <h1 className="h-[75px] flex text-2xl font-semibold px-2 ">
        <span>Thông tin cá nhân</span>
      </h1>
      <div className=" flex px-2 items-center justify-center border-3">
        <form onSubmit={handleSubmit(handleUpdateInfo)}>
          <InputForm
            label="Họ"
            register={register}
            style="flex-auto"
            errors={errors}
            id={"firstName"}
            validate={{ required: "Không được để trống" }}
          ></InputForm>
          <InputForm
            label="Tên"
            register={register}
            style="flex-auto"
            errors={errors}
            id={"lastName"}
            validate={{ required: "Không được để trống" }}
          ></InputForm>

          <InputForm
            label="Email"
            register={register}
            style="flex-auto"
            errors={errors}
            id={"email"}
            validate={{
              required: "Không được để trống",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Định dạng email không đúng ",
              },
            }}
          ></InputForm>
          <InputForm
            label="SDT"
            register={register}
            style="flex-auto"
            errors={errors}
            id={"mobile"}
            validate={{
              required: "Không được để trống",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Số điện thoại phải đủ 10 số ",
              },
            }}
          ></InputForm>
          <InputForm
            label="Đại chỉ"
            register={register}
            style="flex-auto"
            errors={errors}
            id={"address"}
            validate={{
              required: "Không được để trống",
            }}
          ></InputForm>

          <div className="w-full flex flex-col my-2 gap-4">
            <div className=" flex flex-auto gap-1 ">
              <span className="flex items-center font-semibold  gap-2">
                Quyền hạn:
              </span>
              <span className="flex items-center  gap-2">
                {+current?.role === 2001 ? "Admin" : "Khách hàng"}
              </span>
            </div>
            <div className=" flex flex-auto gap-1 ">
              <span className="flex items-center font-semibold  gap-2">
                Trạng thái tài khoản:
              </span>
              <span> {current?.isBlocked ? "Bị khóa" : "Đang hoạt động"}</span>
            </div>
            <div className=" flex flex-auto gap-1 ">
              <span className="flex items-center font-semibold  gap-2">
                Thời gian tạo tài khoản:
              </span>
              <span> {current?.createdAt}</span>
            </div>
          </div>
          <div className=" flex flex-auto gap-1 pb-8 ">
            <span className="flex items-center font-semibold  gap-2">
              Avatar:
            </span>
            <label htmlFor="file">
              <img
                src={current?.avatar || avatar}
                alt="logo"
                className=" p-2 object-cover rounded-full w-[100px] h-[100px] "
              />
            </label>
            <input type="file" id="file" hidden {...register("avatar")} />
          </div>
          <div className="flex justify-end px-4">
            {isDirty && <Button type="submit">Cập nhật thông tin</Button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Personal;
