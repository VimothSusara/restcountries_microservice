const FailedRequestCard = ({ failed }) => {

    return (
        <>
            <div className="col-md-3 rounded-4 failed-request-card-container">
                <div className="px-1 py-2">
                    <h5 className='failed-request-text'>Failed Requests</h5>
                    <h3>{failed ? failed : 0}</h3>
                </div>
            </div>
        </>
    )
}

export default FailedRequestCard;