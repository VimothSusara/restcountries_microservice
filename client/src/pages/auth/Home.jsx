import heroImg from "@/assets/images/hero-img.jpg";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="fade-in">
        <section className="container row">
          <div className="col-md-6 d-flex flex-column text-lg-start text-center justify-content-center align-content-center p-4">
            <h2>Welcome to TravelTales!</h2>
            <p>
              TravelTales is a travel blog website that allows users to share
              their experiences, discover new destinations, and connect with
              other travel enthusiasts. Sign up now to experience the best of
              travel!
            </p>
            <div className="">
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
        <section className="container row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Featured Destination</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  vestibulum, ipsum sed placerat venenatis, nunc lectus
                  convallis neque, in finibus velit ligula vel velit.
                </p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Featured Destination</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  vestibulum, ipsum sed placerat venenatis, nunc lectus
                  convallis neque, in finibus velit ligula vel velit.
                </p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Featured Destination</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  vestibulum, ipsum sed placerat venenatis, nunc lectus
                  convallis neque, in finibus velit ligula vel velit.
                </p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="container row"></section>
      </div>
    </>
  );
};

export default Home;
