const SuccessRateCard = ({ success_rate }) => {

    return (
        <>
            <div className="col-md-2 rounded-4 success-rate-card-container">
                <div className="px-1 py-2">
                    <h5 className='success-rate-text'>Success Rate</h5>
                    <h3>{success_rate ? success_rate : '0.00'}%</h3>
                </div>
            </div>
        </>
    )
}

export default SuccessRateCard;