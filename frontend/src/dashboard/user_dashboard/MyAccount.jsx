import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/images/patient-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import MyBookings from "./MyBookings";
import Profile from "./Profile";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.auth);

  const [tab, setTab] = useState("bookings");

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img
                  src={data.userData ? data.userData.photo : avatar}
                  alt=""
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                {data.userData?.name}
              </h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                Age: {data.userData?.age}
              </p>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                Blood Group:
                <span className="ml-2 text-headingColor text-[22px] leading-8">
                 {data.userData ? data.userData.bloodGroup : "NA"}
                </span>
              </p>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                {data.userData?.email}
              </p>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                {data.userData?.contactNo}
              </p>
            </div>

            <div className="mt-[50px] md:mt-[100px]">
              <buttom
                onClick={logoutHandler}
                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
              >
                Logout
              </buttom>
              <br />
              <br />
              <buttom className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                Delete Account
              </buttom>
            </div>
          </div>

          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <buttom
                onClick={() => setTab("bookings")}
                className={` ${
                  tab == "bookings" && "bg-primaryColor text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-border border-solid border-primaryColor`}
              >
                My Bookings
              </buttom>

              <buttom
                onClick={() => setTab("settings")}
                className={` ${
                  tab == "settings" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-border border-solid border-primaryColor`}
              >
                Profile Settings
              </buttom>
            </div>

            {tab == "bookings" && <MyBookings />}
            {tab == "settings" && <Profile userInfo={data} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
