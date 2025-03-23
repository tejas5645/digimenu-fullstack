import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";

function Home() {

    useEffect(() => {
      AOS.init();
    }, []);



  return (

<section id="hero" className="hero section light-background">
      <div className="container">
        <div className="row gy-4 justify-content-center justify-content-lg-between">
          
          {/* Left Side Text */}
          <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up">
             Welcome to  <br /> DigiMenu
            </h1>
            <p data-aos="fade-up" data-aos-delay="100">
            Order your favorite meals with ease!
            </p>

            {/* Buttons */}
            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
              <Link to="/menu" className="btn-get-started">See Menu</Link>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out">
            <img
              src="public/assets/img/hero-img.png"
              className="img-fluid animated"
              alt="Delicious Food"
            />
          </div>

        </div>
      </div>
    </section>

  );
}

export default Home;
