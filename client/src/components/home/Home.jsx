import animationData from "../../assets/animations/education_animation.json";
import Lottie from "react-lottie";
import "./Home.css";

function Home() {
  const features = [
    {
      name: "Exam Corner",
      description: "Your one-stop study hub! Find timetables, syllabi, and previous year questions for every subject, plus access to all your tutorials in one convenient place.",
    },
    {
      name: "Attendance Tracker",
      description: "Keep tabs on your attendance and know exactly how many more classes you need to attend.",
    },
    {
      name: "Student Corner",
      description: "Connect, collaborate, and thrive. Share doubts, give feedback, and help each other out.",
    },
    {
      name: "Events and Competitions",
      description: "Stay in the loop on campus happenings. Discover exciting events, find details, and register easily.",
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
    <div className="container ">
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

      <div className="cards-container">
        {features.map((feature) => (
          <div key = {feature.name} className="card p-5">
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
