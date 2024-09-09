import animation from "../../assets/animations/education_animation.webm";
import './Home.css';

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 left">
          <video src={animation} type="video/webm" autoPlay loop muted>
            Animation
          </video>
        </div>
        <div className="col-md-6 right">
          <h1>Welcome to AcademiaConnect</h1>
        </div>
      </div>

      <div className="container d-flex flex-wrap justify-content-center mt-5 gap-5">
          <div className="card p-5">
            <div className="card-body">
              <h5>Exam Corner</h5>
            </div>
          </div>
          
          <div className="card p-5">
            <div className="card-body">
              <h5>Student Corner</h5>
            </div>
          </div>

          <div className="card p-5">
            <div className="card-body">
              <h5>Attendance Tracker</h5>
            </div>
          </div>

          <div className="card p-5">
            <div className="card-body">
              <h5>Events</h5>
            </div>
          </div>

          <div className="card p-5">
            <div className="card-body">
              <h5>Stationary Status</h5>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;
