import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuthStore from "@/store/authStore";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Flip, toast, ToastContainer } from "react-toastify";

const schema = yup.object({
  email: yup.string().email("Email is not valid").required("Email is required"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [emailVerifyLoading, setEmailVerifyLoading] = useState(false);
  const [emailVerifyError, setEmailVerifyError] = useState(null);
  const { emailVerify } = useAuthStore();

  const onSubmit = async (data) => {
    setEmailVerifyError(null);
    setEmailVerifyLoading(true);

    try {
      const response = await emailVerify(data.email);

      if (response.success) {
        toast.success("A verification email sent to you. Please check your email");
      }
    }
    catch (error) {
      console.error("Error verifying email:", error);
      setEmailVerifyError(error?.message || "Email verification failed. Please try again");
    }
    finally {
      setTimeout(() => {
        setEmailVerifyError(null);
      }, 5000)
      setEmailVerifyLoading(false);
    }
  };

  return (
    <>
      <div className="container col-md-5 gap-4 mt-md-5 mt-3 d-flex flex-column justify-content-center fade-in shadow p-4">
        <div className="">
          <h4 className="" style={{ color: 'var(--orange-dark)' }}>Reset Password</h4>
          <p className="fs-7 fst-italic">Please enter your email first to receive a verification link.</p>
        </div>
        {emailVerifyError ? (
          <div className="alert alert-danger p-1 my-2" role="alert">
            <div className="text-danger">{emailVerifyError}</div>
          </div>
        ) : null}{" "}
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="form-group mb-md-3 mb-1">
            <label htmlFor="email" className="mb-2">Email</label>
            <div className="input-group gap-1">
              <input
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                {...register("email")}
                aria-label="Email" aria-describedby="email"
                placeholder="Enter email here"
              />
              <button className="btn rounded-end-2" id="email" title="Verify Email" style={{
                backgroundColor: "var(--blue-medium)",
                color: "white",
                border: "none",
              }} type="submit"
                disabled={emailVerifyLoading}>{
                  emailVerifyLoading ? <i className="spinner spinner-border spinner-border-sm" role="status" aria-hidden="true"></i> :
                    <i className="bi bi-patch-check"></i>
                }</button>
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
          </div>
        </form>
        <div className="">
          <NavLink to={"/auth/login"} className="text-decoration-none nav-link text-secondary">
                <i className="bi bi-arrow-left me-2"></i>Back to login
          </NavLink>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          theme="light"
          transition={Flip}
        />
      </div>
    </>
  );
};

export default ForgotPassword;
