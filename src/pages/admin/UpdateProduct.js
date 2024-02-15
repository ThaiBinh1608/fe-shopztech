import React, { memo, useCallback, useEffect, useState } from "react";
import {
  InputForm,
  Select,
  Button,
  MarkDownEditer,
  Loading,
} from "../../components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate, fileToBase64 } from "../../ultils/helpers";
import { apiUpdateProduct } from "../../apis/product";
import { showModal } from "../../store/app/appSlice";

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
  const disPath = useDispatch();
  const { categories } = useSelector((state) => state.app);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [payload, setPayload] = useState({ description: "" });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
  const [preview, setPreview] = useState({ thumb: null, images: [] });
  useEffect(() => {
    window.scroll(0, 0);
    reset({
      title: editProduct?.title || "",
      price: editProduct?.price || 0,
      quantity: editProduct?.quantity || 0,
      color: editProduct?.color || "",
      category: editProduct?.category || "",
      brand: editProduct?.brand || "",
    });
    setPayload({
      description:
        typeof editProduct?.description === "object"
          ? editProduct?.description?.join(",")
          : editProduct?.description,
    });
    setPreview({
      thumb: editProduct?.thumb || "",
      images: editProduct?.images || [],
    });
  }, [editProduct]);

  const handleUpdateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories.find(
          (el) => el.title === data.category
        )?.title;
      const finalObject = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalObject)) {
        formData.append(i[0], i[1]);
      }

      if (finalObject.thumb)
        formData.append(
          "thumb",
          finalObject?.thumb?.length === 0
            ? preview?.thumb
            : finalObject.thumb[0]
        );
      if (finalObject.images) {
        const images =
          finalObject?.image?.length === 0
            ? preview?.images
            : finalObject.images;
        for (let image of images) formData.append("images", image);
      }
      disPath(
        showModal({ isShowModal: true, modalChildren: <Loading></Loading> })
      );
      window.scroll(0, 0);
      const response = await apiUpdateProduct(formData, editProduct._id);
      disPath(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.mes);
        render();
        setEditProduct(null);
      } else toast.error(response.mes);
    }
  };
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

  return (
    <div className="w-full flex flex-col gap-4 relative bg-gray-200">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold px-4 ">
        <span>Update Product</span>
        <span
          className="cursor-pointer border-2 border-violet-500 text-base px-2 py-1 rounded-full hover:text-violet-500"
          onClick={() => setEditProduct(null)}
        >
          Cancel
        </span>
      </h1>

      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label="Name Product "
            register={register}
            fullwidth
            errors={errors}
            id={"title"}
            validate={{ required: "Required fill" }}
            placeholder="Name of new product"
          ></InputForm>
          <div className="w-full flex my-6 gap-4">
            <InputForm
              label="Price"
              register={register}
              style="flex-auto"
              errors={errors}
              id={"price"}
              validate={{ required: "Required fill" }}
              placeholder="Price of new product"
              type="number"
            ></InputForm>
            <InputForm
              label="Quantity"
              register={register}
              style="flex-auto"
              errors={errors}
              id={"quantity"}
              validate={{ required: "Required fill" }}
              placeholder="Quantity of new product"
              type="number"
            ></InputForm>
            <InputForm
              label="Color"
              register={register}
              style="flex-auto"
              errors={errors}
              id={"color"}
              validate={{ required: "Required fill" }}
              placeholder="Color of new product"
              type="text"
            ></InputForm>
          </div>
          <div className="w-full flex my-6 gap-4">
            <Select
              label="Category"
              options={categories?.map((el) => ({
                code: el.title,
                value: el.title,
              }))}
              register={register}
              id="category"
              validate={{ required: "Required fill" }}
              style="flex-auto"
              errors={errors}
            ></Select>
            <Select
              label="Brand"
              options={categories
                ?.find((el) => el.title === watch("category"))
                ?.brand?.map((el) => ({
                  code: el,
                  value: el,
                }))}
              register={register}
              id="brand"
              errors={errors}
              validate={{ required: "Required fill" }}
              style="flex-auto"
            ></Select>
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
              <input
                type="file"
                id="product"
                multiple
                {...register("images")}
              />
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

          <MarkDownEditer
            name="description"
            changeValue={changeValue}
            label="Description"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload?.description}
          ></MarkDownEditer>

          <Button type="submit">Update Product</Button>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateProduct);
