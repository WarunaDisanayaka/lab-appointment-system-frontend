import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; 
import Cookies from 'js-cookie';

export default function Home() {
  const patientId = Cookies.get('patientId');

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#476cb8'}}>
        <div className="container">
          <a className="navbar-brand" href="/">
            <h1>
                SYNLAB
            </h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline my-2 my-lg-0 mx-auto">
              
            </form>


            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">Log In</a>
              </li>
              <li className="nav-item">
                <p className="nav-link">|</p>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/registration">Sign Up</a>
              </li>
              <li className="nav-item">
                <p className="nav-link">|</p>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/appointment">Make an appointment</a>
              </li>
              <li className="nav-item">
                <p className="nav-link">|</p>
              </li>
              <li className="nav-item">
                {patientId && (
                  <a href="/dashboard" className="nav-link">My Account</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* End Navbar */}

      {/* Carousel */}
      <Carousel showThumbs={false}>
  <div>
    <img src="https://online.nmu.edu/wp-content/uploads/2021/09/NMU_Should-I-Get-a-Medical-Laboratory-Science-Degree.jpg.webp" alt="Image 1" style={{ width: "100%", height: "50%" }} />
    <p className="legend"><h4>Welcome to Medilab! We are a state-of-the-art laboratory dedicated to providing accurate and reliable testing services. </h4></p>
  </div>
  <div>
    <img src="https://college.mayo.edu/media/mccms/content-assets/academics/health-sciences-training/medical-laboratory-science-florida-and-minnesota/curriculum/mccms-medical-lab-science-program-3396025-0004-hero-tablet.jpg" alt="Image 2" style={{ width: "100%", height: "50%" }} />
    <p className="legend"><h4>Our team of experienced professionals utilizes cutting-edge technology to deliver precise results for various industries and applications.</h4></p>
  </div>
  <div>
    <img src="https://www.mic-mainz.de/wp-content/uploads/2023/07/MIC_Webbanner_2000x700px.jpg" alt="Image 3" style={{ width: "100%", height: "50%" }} />
    <p className="legend">Make your appointment now!</p>
  </div>
</Carousel>


      {/* Explore Advertisements */}
      <div className="text-center mt-4">
        <h3>Make your apointment</h3>
      </div>

      {/* Card Grid */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://www.macdonaldspharmacy.com/wp-content/uploads/2021/03/regularly-check-your-blood-pressure.jpg" className="card-img-top" alt="Car Image" />
            <div className="card-body">
              <h5 className="card-title">Blood pressure test</h5>
              <p className="card-text">Blood pressure is the term used to describe the strength with which your blood pushes on the sides of your arteries as it's pumped around your body..</p>
             
            </div>
          </div>
        </div>
        {/* Add more cards here */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://www.southcoasthealth.com/assets/upload/a7c59a87-117c-407f-8c47-2718ff76baa4/doctor-testing-blood-sugar-for-diabetes.jpg" className="card-img-top" alt="Car Image" />
            <div className="card-body">
              <h5 className="card-title">Diabetes test</h5>
              <p className="card-text">This measures your blood sugar after an overnight fast (not eating). A fasting blood sugar level of 99 mg/dL or lower is normal, 100 to 125 mg/dL indicates you have prediabetes, and 126 mg/dL or higher indicates you have diabetes..</p>
              
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://www.heartandstroke.ca/-/media/images/doctor-running-ekg-test-on-male-patient_edited.jpg?h=282&w=500&hash=3EE1C61925278E7F2E0D0417C5050E5E5FEDCF5D&rev=a1ae1f6f77834c4c8c188286dc3d2cc1" className="card-img-top" alt="Car Image" />
            <div className="card-body">
              <h5 className="card-title">ECG test</h5>
              <p className="card-text">An electrocardiogram (ECG) is a simple, non-invasive test that records the electrical activity of the heart. An ECG can help diagnose certain heart conditions, including abnormal heart rhythms and coronary heart disease (heart attack and angina).</p>
              
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://www.ypo.education/images/player_image/21-10-14-15-07-06_1952462287_thumbnail_large.png" className="card-img-top" alt="Car Image" />
            <div className="card-body">
              <h5 className="card-title">CT scan test</h5>
              <p className="card-text">A computerized tomography (CT) scan combines a series of X-ray images taken from different angles around your body and uses computer processing to create cross-sectional images (slices) of the bones, blood vessels and soft tissues inside your body.</p>
              
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://insights.ibx.com/wp-content/uploads/2017/09/cholesterol-clipboard-1.jpg" className="card-img-top" alt="Car Image" />
            <div className="card-body">
              <h5 className="card-title">Cholesterol test</h5>
              <p className="card-text">The cholesterol test, or screening, requires a simple blood draw. The cholesterol test checks your levels of: Low-density lipoprotein (LDL) or “bad” cholesterol. Having high levels of LDL cholesterol can lead to plaque buildup in your arteries and result in heart disease or stroke.</p>
              
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card">
            <img src="https://img.medscape.com/thumbnail_library/dt_200518_thyroxine_hormone_blood_test_800x450.jpg" className="card-img-top" alt="Car Image" />
            <div className="card-body">
              <h5 className="card-title">Thyroxine test</h5>
              <p className="card-text">A thyroxine test is a blood test that helps diagnose thyroid conditions. The thyroid is a small, butterfly-shaped gland at the base of your throat. Your thyroid makes hormones that control the way your body uses energy.</p>
              
            </div>
          </div>
        </div>
        
      </div>

      {/* Footer */}
      <footer className="sticky-footer bg-dark text-white py-3" style={{backgroundColor: '#00264d'}}>
        <div className="container text-center" style={{backgroundColor: '#00264d'}}>
          <span>Medi lab Medical laboratary &copy; 2023</span>
        </div>
      </footer>
    </div>
  );
}
