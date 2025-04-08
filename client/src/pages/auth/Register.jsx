import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuthStore from "@/store/authStore";
import { NavLink, useNavigate } from "react-router-dom";

import logoImg from "@/assets/images/login-img.jpg";
import { useState } from "react";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  first_name: yup
    .string()
    .required("First Name is required")
    .min(5, "First Name must be at least 5 characters"),
  last_name: yup.string(),
  phone_number: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  rePassword: yup
    .string()
    .required("Password confirmation required")
    .oneOf([yup.ref("password"), null], "Password must match"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const { registerUser, error } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setRegisterLoading(true);
    const response = await registerUser(
      data.username,
      data.first_name,
      data.last_name,
      data.email,
      data.phone_number,
      data.password
    );
    if (response.success) {
      console.log("Registration successful. Please login.");
      navigate("/auth/login");
    } else {
      console.log("Register failed!", response.message);
    }
    setRegisterLoading(false);
  };

  return (
    <>
      <div className="container login-container col-md-8 gap-4 mt-md-1 mt-1 d-flex justify-content-center fade-in shadow p-2">
        <div className="col-md-5 d-none d-md-block justify-content-center align-content-center px-3">
          <div className="text-center col-md-12">
            <img src={logoImg} alt="Login Image" className="login-img" />
          </div>
          <div className="text-center mt-3">
            <h2>
              <span className="" style={{ color: "var(--orange-dark)" }}>
                Register{" "}
              </span>
              New Accounts
            </h2>
            <p>
              Already have an account?
              <span className="ms-2">
                <NavLink className="" to={"/auth/login"}>
                  Sign In
                </NavLink>
              </span>
            </p>
          </div>
        </div>
        <div className="col-md-7 px-3 py-1">
          <div className="mb-2 mb-md-4 text-center">
            <h3 style={{ color: "var(--gray-dark)" }}>Register an account</h3>
          </div>
          {error ? (
            <div className="alert alert-danger p-1 my-2" role="alert">
              <div className="text-danger">{error}</div>
            </div>
          ) : null}{" "}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="username" className="">
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="Username"
                  {...register("username")}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-6">
                <label htmlFor="first_name" className="mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.first_name ? "is-invalid" : ""
                  }`}
                  placeholder="First Name"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <div className="invalid-feedback">
                    {errors.first_name?.message}
                  </div>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="last_name" className="mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.last_name ? "is-invalid" : ""
                  }`}
                  placeholder="Last Name"
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <div className="invalid-feedback">
                    {errors.last_name?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-6">
                <label htmlFor="phone_number" className="mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.phone_number ? "is-invalid" : ""
                  }`}
                  placeholder="Phone Number"
                  {...register("phone_number")}
                />
                {errors.phone_number && (
                  <div className="invalid-feedback">
                    {errors.phone_number?.message}
                  </div>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="email" className="mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-6">
                <label htmlFor="password" className="mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="rePassword" className="mb-1">
                  Re-Password
                </label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.rePassword ? "is-invalid" : ""
                  }`}
                  placeholder="Re-enter password"
                  {...register("rePassword")}
                />
                {errors.rePassword && (
                  <div className="invalid-feedback">
                    {errors.rePassword?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group p-2 row mt-2">
              <button
                type="submit"
                className="sign-up-btn"
                {...(registerLoading ? "disabled" : "")}
              >
                {registerLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                    <span className="text-light" role="status">
                      Signing Up...
                    </span>
                  </>
                ) : (
                  "SIGN UP"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
