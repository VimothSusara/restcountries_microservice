
import EditProfileDetails from "@/components/EditProfileDetails";
import UpdatePassword from "@/components/updatePassword";

import { ToastContainer, Flip } from "react-toastify";

const Profile = () => {
  return (
    <>
      <div className="profile-main-container">
        <div>
          <h3 className="">Profile Details</h3>
        </div>
        <hr />
        <div className="container row justify-content-center gap-md-5 gap-2">
          <EditProfileDetails />
          <UpdatePassword />
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        theme="light"
        transition={Flip}
      />
    </>
  );
};

export default Profile;
