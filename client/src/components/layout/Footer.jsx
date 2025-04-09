const Footer = () => {
    return (
        <>
            <footer style={{ backgroundColor: 'var(--black-medium)' }} className="text-white pt-5 pb-4 mt-5">
                <div className="container text-center text-md-start">
                    <div className="row">

                        {/* Brand / Description */}
                        <div className="col-md-4 mb-4 px-2">
                            <h5 className="fw-bold">CountryAPI Middleware</h5>
                            <p>
                                A secure and developer-friendly API service that simplifies country data access while keeping your keys and sessions protected.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-md-2 mb-4">
                            <h6 className="fw-semibold">Quick Links</h6>
                            <ul className="list-unstyled">
                                <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                                <li><a href="/register" className="text-white text-decoration-none">Register</a></li>
                                <li><a href="/login" className="text-white text-decoration-none">Login</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="col-md-2 mb-4">
                            <h6 className="fw-semibold">Support</h6>
                            <ul className="list-unstyled">
                                <li><a href="/faq" className="text-white text-decoration-none">FAQ</a></li>
                                <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
                                <li><a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
                            </ul>
                        </div>

                        {/* Socials or Updates */}
                        <div className="col-md-4 mb-4">
                            <h6 className="fw-semibold">Stay Updated</h6>
                            <p>Follow us for the latest updates and API improvements.</p>
                            <div>
                                <a href="#" className="text-white me-3 fs-5"><i className="bi bi-github"></i></a>
                                <a href="#" className="text-white me-3 fs-5"><i className="bi bi-twitter-x"></i></a>
                                <a href="#" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>

                    </div>

                    {/* Bottom copyright */}
                    <div className="text-center pt-3 border-top border-light mt-4">
                        <small>&copy; {new Date().getFullYear()} CountryAPI Middleware. All rights reserved.</small>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;