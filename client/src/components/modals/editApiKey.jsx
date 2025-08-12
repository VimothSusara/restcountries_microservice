import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useApiKeyStore from "@/store/apiKeyStore";
import { useEffect, useState } from "react";
import { updateKeyDetails } from '@/services/apiKeyServices';
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer, toast } from "react-toastify";

const schema = yup.object({
    api_label: yup
        .string()
        .required("A label is required")
        .min(5, "Label must be at least 5 characters")
});

const EditApiKey = ({ selectedKey }) => {
    const [error, setError] = useState(null);
    const [editPending, setEditPending] = useState(false);
    const { updateApiKey } = useApiKeyStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (selectedKey) {
            // Set form values (e.g., via useForm or useState)
            console.log("Editing:", selectedKey);
            setValue("api_label", selectedKey.label);
            setValue("status", selectedKey.active == 1 ? true : false);
        }
    }, [selectedKey]);

    const onSubmit = async (data) => {
        console.log(data);
        setError(null);
        setEditPending(true);

        const status = data.status == true ? 1 : 0;

        try {
            await updateApiKey(selectedKey.id, status, data.api_label);

            toast.success("Key updated successfully")
        }
        catch (error) {
            console.error("Error updating key status:", error);
            setError("Error updating key status. Please try again.");
        } finally {
            setTimeout(() => {
                setError(null);
            }, 3000)
            setEditPending(false);
        }
    };

    return (
        <div className="modal fade" id="editKeyForm" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="editKeyForm" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4" id="editKeyForm">Edit Api Key</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <form onSubmit={handleSubmit(onSubmit)} className="">
                                {error ? (
                                    <div className="alert alert-danger p-1 my-2 common-error-alert" role="alert">
                                        <div className="text-danger">{error}</div>
                                    </div>
                                ) : null}
                                <div className="form-group col-md-12 mb-md-3 mb-1">
                                    <label htmlFor="api_label" className="mb-2">Label</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.api_label ? "is-invalid" : ""}`}
                                        id="api_label"
                                        {...register("api_label")}
                                        placeholder="Enter a label for your api key"
                                    />
                                    {errors.api_label && <div className="invalid-feedback">{errors.api_label.message}</div>}
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="status" className="mb-2">Status</label>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" {...register("status")} type="checkbox" role="switch" id="status" />
                                        <label className="form-check-label" htmlFor="status">Active</label>
                                    </div>
                                </div>
                                <div className="form-group row justify-content-md-end p-2">
                                    <button type="submit" className="col-md-4 save-key-btn" disabled={editPending}>
                                        {
                                            editPending ? <i className="spinner spinner-border spinner-border-sm" role="status" aria-hidden="true"></i> : (
                                                <>
                                                    <i className="bi bi-pen-fill me-2"></i>
                                                    <span>Update Key</span>
                                                </>
                                            )
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditApiKey;