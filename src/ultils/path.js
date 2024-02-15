const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS__CATEGORY: ":category",
  PRODUCTS: "products",
  BLOGS: "blogs",
  FAQ: "faqs",
  OUR_SERVICES: "services",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",
  DETAIL_CART: "detail-cart",
  CHECKOUT: "checkout",

  //admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_ORTHER: "manage-orther",
  CREATE_PRODUCT: "create-product",

  //user
  MEMBER: "member-layout",
  PERSONAL: "personal",
  CARTS: "my-carts",
  WISHLIST: "wishlist",
  HISTORY: "buy-history",
};
export default path;
