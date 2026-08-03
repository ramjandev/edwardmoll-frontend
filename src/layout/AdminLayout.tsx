import { useGetMeQuery } from "@/store/Auth/authApi";
import { addCurrentUser } from "@/store/Auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { data } = useGetMeQuery();
  useEffect(() => {
    if (data?.data) {
      dispatch(addCurrentUser(data.data));
    }
  }, [data, dispatch]);
  return (
    <div className="flex h-screen bg-[#E7ECEF] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
