import React, { useState } from "react";

import avatar from "../../assets/images/patient-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../../config";

const MyAccount = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);

  const [previewURL, setPreviewURL] = useState(data.userData.photo);

  const [formData, setFormData] = useState({
    name: data.userData.name,
    email: data.userData.email,
    gender: data.userData.gender,
    role: data.role,
  });

  const handleFileInputChange = async event => {
    const file = event.target.files[0];
    const newUrl = await uploadImageToCloudinary(file);
    setPreviewURL(newUrl.url);

    // setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${data.userData.email}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify({
          photo: newUrl.url
        })
      });
      console.log("🚀 ~ handleFileInputChange ~ message:", res);
      localStorage.setItem("userData", JSON.stringify({...data.userData, photo: newUrl.url}));
      
      const { message } = await res.json();
      console.log("🚀 ~ handleFileInputChange ~ message:", message);
      
      if (!res.ok) {
        throw new Error(message);
      }
      
      // store should update <<<<<<<<---------------<<<<
      // localStorage.setItem("userData", JSON.stringify(res.data));

      // setLoading(false);
      // toast.success(message)
      // navigate('/login');
    } catch (error) {
      // setLoading(false);
      // toast.error(error.message);
    }
  }

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="pb-[50px] px-[30px] rounded-md">
          <div className="flex items-center justify-center">
            <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
              <img
                src={previewURL ? previewURL : avatar}
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
              {data.userData?.email}
            </p>
            <p className="text-textColor text-[15px] leading-6 font-medium">
              Blood Type:
              <span className="ml-2 text-headingColor text-[22px] leading-8">
                O-
              </span>
            </p>
          </div>

          <div className="mt-[50px] md:mt-[100px]">
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                 onChange={handleFileInputChange}
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem]
                 text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              >
                Upload Photo
              </label>
            </div>
            <br />
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
      </div>
    </div>
  );
};

export default MyAccount;
