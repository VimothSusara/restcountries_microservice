import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuthStore from "@/store/authStore";
import { NavLink } from "react-router-dom";

import logoImg from "@/assets/images/login-img.jpg";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { login } = useAuthStore();

  const onSubmit = async (data) => {
    // await login(data.username, data.password);
    console.log(data);
  };

  return (
    <>
      <div className="container login-container col-md-7 gap-4 mt-md-5 mt-3 d-flex justify-content-center fade-in shadow p-4">
        <div className="col-md-6 d-none d-md-block">
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
        <div className="col-md-6 px-3 py-1">
          <div className="mb-2 mb-md-4 text-center">
            <h3 style={{ color: "var(--gray-dark)" }}>Register an account</h3>
          </div>
          <div className=""></div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="form-group mb-md-3 mb-1">
              <label htmlFor="username" className="mb-1">
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
            <div className="form-group mb-md-3 mb-1">
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
            <div className="form-group p-2 row">
              <button type="submit" className="sign-up-btn">
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
