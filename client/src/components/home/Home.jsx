import animationData from "../../assets/animations/education_animation.json";
import Lottie from "react-lottie";
import "./Home.css";

function Home() {
  const features = [
    {
      name: "Exam Corner",
      description: "",
    },
    {
      name: "Student Corner",
      description: "",
    },
    {
      name: "Attendance Tracker",
      description: "",
    },
    {
      name: "Events and Competitions",
      description: "",
    },
    {
      name: "Stationary Status",
      description: "",
    },
  ];
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 left">

        <Lottie 
	    options={defaultOptions}
        height={600}
        width={600}
      />
          
        </div>
        <div className="col-md-6 right">
          <h1>Welcome to AcademiaConnect</h1>
        </div>
      </div>

      <div className="cards-container d-flex gap-5 flex-wrap justify-content-center">
        {features.map((feature) => (
          <div className="card p-5">
            <div className="card-inner">
              <div className="card-front">
                <h5>{feature.name}</h5>
              </div>
              <div className="card-back">
                <p>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
