import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuthStore from "@/store/authStore";

import { toast } from "react-toastify";

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
    // password: yup
    //     .string()
    //     .required("Password is required")
    //     .min(8, "Password must be at least 8 characters"),
    // rePassword: yup
    //     .string()
    //     .required("Password confirmation required")
    //     .oneOf([yup.ref("password"), null], "Password must match"),
});

const EditProfileDetails = () => {
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState(null);
    const { user, updateUserDetails } = useAuthStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (user) {
            setValue("username", user.username || "");
            setValue("first_name", user.first_name || "");
            setValue("last_name", user.last_name || "");
            setValue("phone_number", user.phone_number || "");
            setValue("email", user.email || "");
        }
    }, [user, setValue])

    const onSubmit = async (data) => {
        setEditLoading(true);
        setEditError(null);

        try {
            await updateUserDetails(
                data.username,
                data.first_name,
                data.last_name,
                data.phone_number,
                data.email
            )
            reset(data);
            toast.success("User updated successfully.")
        }
        catch (error) {
            console.log("Error while updating user: ", error.message);
            setEditError(error?.message || "Failed to update user details");
        }
        finally {
            setTimeout(() => {
                setEditError(null);
            }, 4000)
            setEditLoading(false);
        }
    };

    return (
        <>
            <div className="col-md-6 p-3 rounded-4 border border-2">
                <div className="">
                    <h5>Update your profile details</h5>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                    {editError ? (
                        <div className="alert alert-danger p-1 my-2 common-error-alert" role="alert">
                            <div className="text-danger">{editError}</div>
                        </div>
                    ) : null}
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="username" className="mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? "is-invalid" : ""
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
                    <div className="row mt-3">
                        <div className="form-group col-md-6">
                            <label htmlFor="first_name" className="mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.first_name ? "is-invalid" : ""
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
                                className={`form-control ${errors.last_name ? "is-invalid" : ""
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
                    <div className="row mt-3">
                        <div className="form-group col-md-6">
                            <label htmlFor="phone_number" className="mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.phone_number ? "is-invalid" : ""
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
                    <div className="form-group p-2 row mt-3">
                        <button
                            type="submit"
                            className="sign-up-btn col-md-6"
                            disabled={editLoading}
                        >
                            {editLoading ? (
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
                                "Update Profile"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProfileDetails;