import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useApiKeyStore from "@/store/apiKeyStore";
import { useState } from "react";
import { generateApiKey } from '@/services/apiKeyServices';
import { toast } from "react-toastify";
import downloadApiKeyAsText from "@/util/downloadKey";

const schema = yup.object({
    api_key: yup.string().required("Api key is required").min(10, "Api key must be at least 10 characters"),
    api_label: yup
        .string()
        .required("A label is required")
        .min(5, "Label must be at least 5 characters")
});

const CreateNewApiKey = () => {
    const [pendingKeyGenerate, setPendingKeyGenerate] = useState(false);
    const [savePending, setSavePending] = useState(false);
    const [error, setError] = useState(null);

    const { saveNewApiKey } = useApiKeyStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            api_key: "",
            api_label: "",
        }
    });

    const onSubmit = async (data) => {
        console.log(data);
        setError(null);
        setSavePending(true);

        try {
            await saveNewApiKey(data.api_key, data.api_label);

            //download key as a text file
            downloadApiKeyAsText(data.api_key, data.api_label);

            setValue("api_key", "");
            setValue("api_label", "");

            toast.success("Key created successfully.")
        }
        catch (error) {
            console.error("Error saving API key:", error);
            setError(error?.message || "Error saving API key. Please try again.");
        }
        finally {
            setTimeout(() => {
                setError(null);
            }, 5000)
            setSavePending(false);
        }
    };

    const generateKey = async () => {
        setPendingKeyGenerate(true);
        // // Simulate key generation
        // setTimeout(() => {
        //     setPendingKeyGenerate(false);
        //     // Set the generated key in the input field (for demonstration purposes)
        //     document.getElementById("api_key").value = "generated-key-1234567890";
        // }, 2000);

        try {
            const response = await generateApiKey();
            console.log(response);

            setValue("api_key", response.data.api_key);
        }
        catch (error) {
            console.error("Error generating API key:", error);
            setError("Failed to generate API key. Please try again.");
            setTimeout(() => {
                setError(null);
            }, 5000)
        }
        finally {
            setPendingKeyGenerate(false);
        }
    }

    return (
        <div className="modal fade" id="createNewKeyForm" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4" id="staticBackdropLabel">Create New Api Key</h1>
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
                                <div className="form-group mb-md-3 mb-1">
                                    <label htmlFor="api_key" className="mb-2">Api Key</label>
                                    <div className="input-group gap-1">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.api_key ? "is-invalid" : ""}`}
                                            id="api_key"
                                            {...register("api_key")}
                                            aria-label="Example text with button addon" aria-describedby="api_key"
                                            placeholder="Enter or generate your api key here"
                                        />
                                        <button type="button" className="btn rounded-end-2" id="api_key" title="Generate a key" style={{
                                            backgroundColor: "var(--blue-medium)",
                                            color: "white",
                                            border: "none",
                                        }} onClick={generateKey} disabled={pendingKeyGenerate}>{
                                                pendingKeyGenerate ? <i className="spinner spinner-border spinner-border-sm" role="status" aria-hidden="true"></i> :
                                                    <i className="bi bi-key-fill"></i>
                                            }</button>
                                        {errors.api_key && <div className="invalid-feedback">{errors.api_key.message}</div>}
                                    </div>
                                </div>
                                <div className="form-group mb-md-3 mb-1">
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
                                <div className="form-group row justify-content-md-end p-2">
                                    <button type="submit" className="col-md-3 save-key-btn">
                                        <i className="bi bi-floppy2 me-2"></i>
                                        Save Key
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

export default CreateNewApiKey;