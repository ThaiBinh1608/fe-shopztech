import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../inputs/InputForm";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { fileToBase64 } from "../../ultils/helpers";
import Swal from "sweetalert2";
import { showModal } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";
import Loading from "../common/Loading";
import { apiAddVarriant } from "../../apis";
const Varrians = ({ customizeVarrians, setCustomizeVarrians, render }) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm({});
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  useEffect(() => {
    reset({
      title: customizeVarrians?.title,
      price: customizeVarrians?.price,
      color: customizeVarrians?.color,
    });
  }, [customizeVarrians]);

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await fileToBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("Sai định dạng ảnh");
        return;
      } else {
        const base64 = await fileToBase64(file);
        imagesPreview.push(base64);
      }
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);
  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);
  const disPath = useDispatch();
  const handleAddVarrian = async (data) => {
    if (data.color === customizeVarrians.color) {
      Swal.fire({
        title: "Màu sắc không được giống nhau",
      });
    } else {
      console.log(data.thumb);
      const formData = new FormData();
      for (let i of Object.entries(data)) {
        formData.append(i[0], i[1]);
      }
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      disPath(
        showModal({ isShowModal: true, modalChildren: <Loading></Loading> })
      );

      const response = await apiAddVarriant(formData, customizeVarrians._id);
      disPath(showModal({ isShowModal: false, modalChildren: null }));
      console.log(response);
      if (response.success) {
        toast.success(response.mes);
        reset();
        setPreview({ thumb: "", images: [] });
        window.scroll(0, 0);
      } else toast.error(response.mes);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 relative bg-gray-200">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold px-4 ">
        <span>Varrians of product</span>
        <span
          onClick={() => setCustomizeVarrians(null)}
          className="cursor-pointer border-2 border-violet-500 text-base px-2 py-1 rounded-full hover:text-violet-500"
        >
          Back
        </span>
      </h1>

      <div className="p-4">
        <form onSubmit={handleSubmit(handleAddVarrian)}>
          <div className="w-full flex my-6 gap-4">
            <InputForm
              label="Original Name  "
              register={register}
              fullwidth
              errors={errors}
              id={"title"}
              validate={{ required: "Required fill" }}
              placeholder="Name of varriant "
              style="flex-auto"
            ></InputForm>
          </div>
          <div className="w-full flex my-6 gap-4">
            <InputForm
              label="Price varriant  "
              register={register}
              fullwidth
              errors={errors}
              id={"price"}
              validate={{ required: "Required fill" }}
              placeholder="Price of varriant "
              type="number"
              style="flex-auto"
            ></InputForm>
            <InputForm
              label="Color Varriant  "
              register={register}
              fullwidth
              errors={errors}
              id={"color"}
              placeholder="Color of varriant "
              style="flex-auto"
            ></InputForm>
          </div>
          <div className=" flex-auto gap-2 border-2  p-4">
            <div className="flex flex-col">
              <label htmlFor="thumb" className="font-medium">
                Upload Thumb
              </label>
              <input type="file" id="thumb" {...register("thumb")} />
              {errors["thumb"] && (
                <small className="text-xs text-red-500">
                  {errors["thumb"]?.message}
                </small>
              )}
            </div>
            {preview.thumb !== null && (
              <div className="my-4">
                <img
                  src={preview.thumb}
                  alt="thumb"
                  className="w-[200px] object-contain"
                />
              </div>
            )}
          </div>
          <div className="flex-auto  gap-2  border-2  p-4">
            <div className="flex flex-col">
              <label htmlFor="product" className="font-medium">
                Upload Image Of Product
              </label>
              <input type="file" id="images" multiple {...register("images")} />
              {errors["product"] && (
                <small className="text-xs text-red-500">
                  {errors["product"]?.message}
                </small>
              )}
            </div>
            {preview.images.length > 0 && (
              <div className="my-4 w-full gap-2 flex flex-wrap">
                {preview.images?.map((el, idx) => (
                  <div className="w-fit relative" key={idx}>
                    <img
                      src={el}
                      alt="images product"
                      className="w-[150px] object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button type="submit">Create Varrian Product</Button>
        </form>
      </div>
    </div>
  );
};

export default memo(Varrians);
