import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_HOST;

export const fetchApiKeys = async () => {
    return await axios.get(
        `${API_BASE_URL}/api/key/all`,
        {
            withCredentials: true,
        }
    );
}

export const generateApiKey = async () => {
    return await axios.post(
        `${API_BASE_URL}/api/key/generate-key`,
        {},
        {
            withCredentials: true,
        }
    );
}

export const saveApiKey = async (api_key, api_label) => {
    return await axios.post(
        `${API_BASE_URL}/api/key/save`,
        { api_key, api_label },
        {
            withCredentials: true,
        }
    );
}

export const updateKeyDetails = async (id, status, label) => {
    return await axios.post(
        `${API_BASE_URL}/api/key/update/${id}`,
        { status, label },
        {
            withCredentials: true,
        }
    );
}

export const deleteApiKey = async (id) => {
    return await axios.delete(
        `${API_BASE_URL}/api/key/delete/${id}`,
        {
            withCredentials: true
        }
    )
}