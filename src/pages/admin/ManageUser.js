import React, { useCallback, useEffect, useState } from "react";
import { apiDeleteUser, apiGetUsers, apiUpdateUser } from "../../apis/user";
import { roles, blockstatus } from "../../ultils/contants";
import moment from "moment";
import {
  InputField,
  InputForm,
  Pagination,
  Select,
  Button,
} from "../../components";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    isBlocked: "",
  });
  const [update, setUpdate] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [editEL, setEditEL] = useState(null);
  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) setUsersData(response);
  };
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const queriesDebounce = useDebounce(queries.q, 1000);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params, update]);
  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, editEL._id);
    if (response.success) {
      setEditEL(null);
      render();
      toast.success(response.mes);
    } else {
      toast.error(response.mes);
    }
  };
  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "Are you sure remove this user ?",
      // text: "Are you ready remove this user ?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(editEL._id);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else {
          toast.error(response.mes);
        }
      }
    });
  };
  // useEffect(() => {
  //   if (editEL)
  //     reset({
  //       role: editEL.role,
  //       status: editEL.isBlocked,
  //     });
  // }, [editEL]);
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold px-4 ">
        <span>Manage Users</span>
      </h1>
      <div className="w-full px-2 ">
        <div className="flex  justify-end py-4">
          <InputField
            value={queries.q}
            setValue={setQueries}
            style="w500"
            nameKey="q"
            placeholder="Nhập tên hoặc email user"
          ></InputField>
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editEL && <Button type="submit">Update</Button>}
          <table className="table-auto mb-6 text-left w-full">
            <thead className="font-bold bg-gray-800 text-white  text-[13px] ">
              <tr className="border-2 border-gray-500">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email address</th>
                <th className="px-4 py-2">First name</th>
                <th className="px-4 py-2">Last name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">CreatedAt</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData?.users?.map((el, inx) => (
                <tr key={el._id} className="border-2 border-gray-500">
                  <td className="py-2 px-4 ">{inx + 1}</td>
                  <td className="py-2 px-4 ">
                    {editEL?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullwidth
                        errors={errors}
                        defaultValue={editEL?.email}
                        id={"email"}
                        validate={{
                          required: "Required  fill",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="py-2 px-4 ">
                    {editEL?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullwidth
                        errors={errors}
                        defaultValue={editEL?.firstName}
                        id={"firstName"}
                        validate={{ required: "Required fill" }}
                      />
                    ) : (
                      <span>{el.firstName}</span>
                    )}
                  </td>
                  <td className="py-2 px-4 ">
                    {editEL?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullwidth
                        errors={errors}
                        defaultValue={editEL?.lastName}
                        id={"lastName"}
                        validate={{ required: "Required fill" }}
                      />
                    ) : (
                      <span>{el.lastName}</span>
                    )}
                  </td>
                  <td className="py-2 px-4 ">
                    {editEL?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullwidth
                        errors={errors}
                        defaultValue={editEL?.mobile}
                        id={"mobile"}
                        validate={{
                          required: "Required fill",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "invalid phone number ",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.mobile}</span>
                    )}
                  </td>
                  <td className="py-2 px-4 ">
                    {editEL?._id === el._id ? (
                      <Select
                        register={register}
                        fullwidth
                        errors={errors}
                        defaultValue={el.role}
                        id={"role"}
                        validate={{ required: "Required fill" }}
                        options={roles}
                      />
                    ) : (
                      <span>
                        {roles.find((role) => +role.code === +el.role)?.value}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 ">
                    {editEL?._id === el._id ? (
                      <Select
                        register={register}
                        fullwidth
                        errors={errors}
                        defaultValue={el.isBlocked}
                        id={"isBlocked"}
                        validate={{ required: "Required fill" }}
                        options={blockstatus}
                      />
                    ) : (
                      <span>{el.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </td>
                  <td className="py-2 px-4 ">
                    {moment(el.createdAt).format("DD/MM/YY")}
                  </td>
                  <td className="py-2 px-4 ">
                    {editEL?._id === el._id ? (
                      <span
                        onClick={() => setEditEL(null)}
                        className="px-2 text-yellow-500 hover:underline cursor-pointer"
                      >
                        Back
                      </span>
                    ) : (
                      <span
                        onClick={() => setEditEL(el)}
                        className="px-2 text-yellow-500 hover:underline cursor-pointer"
                      >
                        Edit
                      </span>
                    )}
                    <span
                      onClick={handleDeleteUser}
                      className="px-2 text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        <div className="w-full flex items-center justify-center">
          <Pagination totalCount={usersData?.counts}></Pagination>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
