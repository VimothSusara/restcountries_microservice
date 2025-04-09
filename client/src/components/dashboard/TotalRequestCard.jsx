const TotalRequestCard = ({ total }) => {

    return (
        <>
            <div className="col-md-3 rounded-4 total-request-card-container">
                <div className="px-1 py-2">
                    <h5 className='total-request-text'>Total Requests</h5>
                    <h3>{total ? total : 0}</h3>
                </div>
            </div>
        </>
    )
}

export default TotalRequestCard;