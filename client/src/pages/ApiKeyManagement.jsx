import CreateNewApiKey from "@/components/modals/createNewApiKey";
import KeyManageTable from "@/components/KeyManageTable";

import { ToastContainer, Bounce, Flip } from 'react-toastify';
import EditApiKey from "@/components/modals/editApiKey";
import { useState } from "react";

const ApiKeyManagement = () => {

  const [selectedKey, setSelectedKey] = useState(null); // 👈 state for selected key

  return (
    <>
      <div className="manage-api-key-container">
        <div>
          <h3 className="">Manage Api Keys</h3>
        </div>
        <hr />
        <div className="d-flex flex-row align-items-center">
          <div className="p-1">
            <p className="fst-italic" style={{ fontSize: ".9rem" }}>
              You can create, edit and delete api keys here. 
            </p>
          </div>
          <button className="btn text-white ms-auto" data-bs-toggle="modal" data-bs-target="#createNewKeyForm" title="create a new key" style={{ backgroundColor: 'var(--orange-dark)' }}><i className="bi bi-plus-lg me-1"></i>Create New Api Key</button>
        </div>
        <div className="container-fluid">
          <KeyManageTable onEdit={setSelectedKey} />
        </div>
        <CreateNewApiKey />
        <EditApiKey selectedKey={selectedKey} />
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          theme="light"
          transition={Flip}
        />
      </div>
    </>
  );
};

export default ApiKeyManagement;
