import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuthStore from "@/store/authStore";

import { toast } from "react-toastify";

const schema = yup.object({
    current_password: yup
        .string()
        .required("Current Password is required")
        .min(8, "Password must be at least 8 characters"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    rePassword: yup
        .string()
        .required("Password confirmation required")
        .oneOf([yup.ref("password"), null], "Password must match"),
});

const UpdatePassword = () => {
    const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);
    const [updatePasswordError, setUpdatePasswordError] = useState(null);
    const { updatePassword } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await updatePassword(data.current_password, data.password);
            reset();
            toast.success("Password update successfully")
        }
        catch (error) {
            console.log("Error while updating password: ", error.message);
            setUpdatePasswordError(error?.message || "Failed to update password");
        }
        finally {
            setTimeout(() => {
                setUpdatePasswordError(null);
            }, 4000)
            setUpdatePasswordLoading(false);
        }
    };
    return (
        <>
            <div className="col-md-5 p-3 rounded-4 border border-2">
                <div className="">
                    <h5>Update your password</h5>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                    {updatePasswordError ? (
                        <div className="alert alert-danger p-1 my-2 common-error-alert" role="alert">
                            <div className="text-danger">{updatePasswordError}</div>
                        </div>
                    ) : null}
                    <div className="row mt-2">
                        <div className="form-group">
                            <label htmlFor="current_password" className="mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                className={`form-control ${errors.current_password ? "is-invalid" : ""
                                    }`}
                                placeholder="Current Password"
                                {...register("current_password")}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="form-group">
                        <label htmlFor="password" className="mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""
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
                    <div className="form-group">
                        <label htmlFor="rePassword" className="mb-1">
                            Re-Password
                        </label>
                        <input
                            type="password"
                            className={`form-control ${errors.rePassword ? "is-invalid" : ""
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
                    <div className="form-group p-2 row mt-3">
                        <button
                            type="submit"
                            className="sign-up-btn col-md-6"
                            disabled={updatePasswordLoading}
                        >
                            {updatePasswordLoading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="text-light" role="status">
                                        Updating...
                                    </span>
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdatePassword;