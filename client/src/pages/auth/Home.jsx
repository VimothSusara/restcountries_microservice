import heroImg from "@/assets/images/hero-img.jpg";
import { NavLink } from "react-router-dom";

const features = [
  {
    icon: 'bi-shield-lock',
    title: 'Secure Authentication',
    desc: 'User registration, login, hashed passwords, session management & secure API key generation.'
  },
  {
    icon: "bi-globe",
    title: "Essential Country Insights",
    desc: "Streamlined responses with only country name, currency, capital, languages, and flag.",
  },
  {
    icon: "bi-key",
    title: "API Key Management",
    desc: "Generate, view, and revoke personal API keys via an intuitive dashboard.",
  },
  {
    icon: "bi-code-slash",
    title: "Developer Friendly",
    desc: "RESTful endpoints, JSON responses, and clear documentation for fast onboarding.",
  },
  {
    icon: "bi-hdd-network",
    title: "SQLite-Powered Backend",
    desc: "Secure, lightweight storage with encryption and validation best practices.",
  },
  {
    icon: "bi-lightning-charge",
    title: "Fast & Lightweight API",
    desc: "Efficient middleware that delivers only essential data from RestCountries.com.",
  },
];

const Home = () => {
  return (
    <>
      <div className="fade-in">
        <section className="container row">
          <div className="col-md-6 d-flex flex-column text-lg-start text-center justify-content-center align-content-center p-4">
            <h2 className="p-1">Welcome to <span className="" style={{ color: 'var(--orange-dark)' }}>Countries API Service!</span></h2>
            <p className="p-1">
              A secure and efficient middleware that provides streamlined access to essential country data — including name, currency, capital, languages, and national flag — all powered by RestCountries.com. With built-in authentication, API key management, and a user-friendly dashboard, this service is built for developers who value simplicity and security.
            </p>
            <div className="p-1">
              <NavLink to={"/auth/register"} className="getStarted-btn">
                GET STARTED
              </NavLink>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-content-center p-3">
            <img
              src={heroImg}
              alt="Travel Blog"
              className="hero-img img-fluid"
            />
          </div>
        </section>
        <section className="container p-2">
          <h2 className="text-center mb-4 fw-semibold" style={{ color: 'var(--gray-dark)' }}>Key <span className="" style={{ color: 'var(--orange-light)' }}>Features</span></h2>
          <div className="row g-3">
            {features.map((feature, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 shadow-sm border-0 p-2 rounded-2 feature-card">
                  <div className="card-body">
                    <div className="mb-3 fs-2" style={{ color: 'var(--orange-darker)' }}>
                      <i className={`bi ${feature.icon}`}></i>
                    </div>
                    <h5 className="card-title fw-semibold">{feature.title}</h5>
                    <p className="card-text text-muted">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="container-fluid p-1 my-md-4">
          <h2 className="text-center mb-4 fw-semibold" style={{ color: 'var(--gray-dark)' }}>How It <span className="" style={{ color: 'var(--orange-light)' }}>Works</span></h2>

          <div className="row justify-content-center gap-4">
            <div className="col-md-2 hiw-card p-3 rounded-4">
              <i className="bi bi-person-plus fs-1"></i>
              <h5 className="mt-3">Register</h5>
              <p>Create a secure account with hashed password & session management.</p>
            </div>
            <div className="col-md-2 hiw-card p-3 rounded-4">
              <i className="bi bi-key-fill fs-1"></i>
              <h5 className="mt-3">Generate API Key</h5>
              <p>Get your personal key instantly</p>
            </div>
            <div className="col-md-2 hiw-card p-3 rounded-4">
              <i className="bi bi-send fs-1"></i>
              <h5 className="mt-3">Make Requests</h5>
              <p>Query only essential country info from our secure API.</p>
            </div>
            <div className="col-md-2 hiw-card p-3 rounded-4">
              <i className="bi bi-bar-chart-line fs-1"></i>
              <h5 className="mt-3">Track Usage</h5>
              <p>Monitor requests and manage keys easily.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
