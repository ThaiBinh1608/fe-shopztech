import { generatePath } from "react-router-dom";
import icons from "../ultils/icons";

const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatmoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

export const formatPrice = (number) => Math.round(number / 1000) * 1000;

export const renderStarFromNumber = (number, size) => {
  if (!Number(number)) return;
  const stars = [];
  number = Math.round(number);
  for (let i = 0; i < +number; i++)
    stars.push(<AiFillStar color="gold" size={size || 20}></AiFillStar>);
  for (let i = 5; i > +number; i--)
    stars.push(<AiOutlineStar color="gold" size={size || 20}></AiOutlineStar>);
  return stars;
};
export function secondsToHms(d) {
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
}
export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Không được để trống" },
      ]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Sai Email" },
          ]);
        }
        break;
      case "password":
        if (arr[1].length < 6) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Mật khẩu tối thiểu 6 ký tự" },
          ]);
        }
        break;

      default:
        break;
    }
  }
  return invalids;
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export const fileToBase64 = (filename, filepath) => {
  return new Promise((resolve, reject) => {
    var file = new File([filename], filepath);
    var render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => resolve(render.result);
    render.onerror = (error) => reject(error);
  });
};