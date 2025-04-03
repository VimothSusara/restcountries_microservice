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

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { login, isAuthenticated, error } = useAuthStore();

  const onSubmit = async (data) => {
    const response = await login(data.username, data.password);
    // console.log(data);
    if (response.success) {
      console.log("Login successful");
      //TODO: handle login
    } else {
      console.log("Login failed", response.message);
    }
  };

  return (
    <>
      <div className="container login-container col-md-7 gap-4 mt-md-5 mt-3 d-flex justify-content-center fade-in shadow p-4">
        <div className="col-md-6 px-3 py-1">
          <div className="mb-2 mb-md-4 text-center">
            <h3 style={{ color: "var(--gray-dark)" }}>Login to your Account</h3>
          </div>
          {error ? (
            <div className="alert alert-danger p-1 my-2" role="alert">
              <div className="text-danger">{error}</div>
            </div>
          ) : null}
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
                LOGIN
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6 d-none d-md-block justify-content-center align-content-center">
          <div className="text-center col-md-12">
            <img src={logoImg} alt="Login Image" className="login-img" />
          </div>
          <div className="text-center mt-3">
            <h2>
              <span className="" style={{ color: "var(--orange-dark)" }}>
                Welcome{" "}
              </span>
              Back!
            </h2>
            <p>
              Don&apos;t have an account yet?
              <span className="ms-2">
                <NavLink className="" to={"/auth/register"}>
                  Sign Up
                </NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
