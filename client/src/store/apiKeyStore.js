import { create } from 'zustand';

import { fetchApiKeys, saveApiKey, updateKeyDetails, deleteApiKey } from '@/services/apiKeyServices';

const useApiKeyStore = create((set) => ({
    keys: [],
    loading: false,
    error: null,
    api_stats: null,

    fetchKeys: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetchApiKeys();
            set({ keys: response.data.api_keys });
        } catch (err) {
            set({ error: err.response?.data?.message || 'Failed to fetch API keys!' });
        } finally {
            set({ loading: false });
        }
    },

    saveNewApiKey: async (api_key, api_label) => {
        try {
            const response = await saveApiKey(api_key, api_label);
            console.log(response.data);
            set((state) => ({
                keys: [...state.keys, response.data.api_key],
            }));
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to save API key!');
        }
    },

    updateApiKey: async (id, new_status, new_label) => {
        try {
            const response = await updateKeyDetails(id, new_status, new_label);
            console.log(response.data);
            const { status, label } = response.data.api_key;
            set((state) => ({
                keys: state.keys.map((key) =>
                    key.id === id ? { ...key, active: status, label } : key
                ),
            }));
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to update API key!');
        }
    },

    deleteApiKey: async (id) => {
        try {
            await deleteApiKey(id);
            set((state) => ({
                keys: state.keys.filter((key) => key.id !== id),
            }));
        }
        catch (err) {
            throw new Error(err.response?.data?.message || 'Failed to delete the API key!');
        }
    },
}));

export default useApiKeyStore;