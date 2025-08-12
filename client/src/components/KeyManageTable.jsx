import { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { formatDistanceToNowStrict } from "date-fns";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { ToastContainer, toast } from 'react-toastify';

import useApiKeyStore from "@/store/apiKeyStore";
import { updateKeyDetails } from "@/services/apiKeyServices";

const KeyManageTable = ({ onEdit }) => {
    const [pending, setPending] = useState(false);
    const { fetchKeys, keys, deleteApiKey } = useApiKeyStore();

    const handleDelete = (id) => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure you want to delete this key?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        try {
                            await deleteApiKey(id);
                            toast.success("Key Deleted Successfully")
                        }
                        catch (error) {
                            toast.error(error?.message || "Error deleting key");
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => {
                    },
                },
            ],
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setPending(true);
            try {
                await fetchKeys();
            }
            catch (error) {
                console.log("Error while fetching api keys", error.message)
            }
            finally {
                setPending(false);
            }
        };
        fetchData();
    }, [fetchKeys]);

    const handleRefresh = async () => {
        setPending(true);
        try {
            await fetchKeys();
        }
        catch (error) {
            toast.warning(error?.message || "Refresh Failed.")
        }
        finally {
            setPending(false)
        }
    }

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            omit: true,
        },
        {
            name: 'Label',
            selector: row => row.label,
            sortable: true,
            width: '24%',
        },
        {
            name: 'Key',
            selector: row => row.key,
            width: '15%',
        },
        {
            name: 'Last Used',
            selector: row => row.last_used ? formatDistanceToNowStrict(new Date(row.last_used), { addSuffix: true }) : 'Not Used', //TODO: format date to '1 week ago'
            sortable: true,
            width: '15%',
        },
        {
            name: 'Count',
            selector: row => (
                row.used_count ? row.used_count : 0
            ),
            sortable: true,
            width: '10%',
        },
        {
            name: "Status",
            cell: row => (
                <span className={`badge ${row.active == 1 ? 'bg-success' : 'bg-danger'} p-2 rounded-pill border-0`}>                    
                    {row.active == 1 ? 'Active' : 'Inactive'}
                </span>)
            ,
            width: '13%',
        },
        {
            name: 'Created',
            selector: row => row.created ? formatDistanceToNowStrict(new Date(row.created), { addSuffix: true }) : 'No Date',
            sortable: true,

            width: '13%',
        },
        {
            // name: 'Actions',
            cell: row => (
                <div className="d-flex justify-content-between gap-2">
                    <button
                        className="text-white px-2 py-1 rounded border-0"
                        title="Delete Key"
                        onClick={() => handleDelete(row.id)}
                        style={{ backgroundColor: 'var(--red-medium)' }}
                    >
                        <i className="bi bi-trash3-fill"></i>
                    </button>
                    <button className="text-white px-2 py-1 rounded border-0" data-bs-toggle="modal" data-bs-target="#editKeyForm" title="Edit Key" style={{
                        backgroundColor: 'var(--blue-medium)'
                    }} onClick={() => onEdit(row)}>
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                </div>
            ),
            width: '10%',
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: '',
        selectAllRowsItem: true,
        noRowsPerPage: false
    };

    // const conditionalRowStyles = [
    //     {
    //         when: row => row.active == 1,
    //         style: {
    //             backgroundColor: 'rgba(179, 252, 215, 0.9)',
    //             color: 'white',
    //             '&:hover': {
    //                 cursor: 'pointer',

    //             },
    //         },
    //     },
    // ];

    return (
        <>
            <div className="d-flex justify-content-end mb-2">
                <button className="btn btn-sm border-none rounded-2" onClick={handleRefresh} disabled={pending}>
                    <i className="bi bi-arrow-repeat me-2"></i>
                    Refresh
                </button>
            </div>
            <DataTable
                columns={columns}
                data={keys}
                pagination
                progressPending={pending}
                paginationComponentOptions={paginationComponentOptions}
            // conditionalRowStyles={conditionalRowStyles}
            // pointerOnHover
            // striped
            />
        </>
    );
}

export default KeyManageTable;