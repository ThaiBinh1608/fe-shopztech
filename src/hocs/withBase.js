import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const withBase = (Component) => (props) => {
  const navigate = useNavigate();
  const disPath = useDispatch();
  const localtion = useLocation();
  return (
    <Component
      {...props}
      navigate={navigate}
      disPath={disPath}
      localtion={localtion}
    ></Component>
  );
};

export default withBase;
