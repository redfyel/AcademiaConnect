import React from "react";
import { useRouteError } from "react-router-dom";

function RoutingError() {
  let error = useRouteError();
  console.log(error);


  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ebebff", 
  };

  const cardStyle = {
    backgroundColor: "#ffffff", 
    borderRadius: "0.5rem",
    boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
    padding: "2rem",
    textAlign: "center",
    width: "80%",
    maxWidth: "600px",
  };

  const titleStyle = {
    color: "#cb0980", 
    fontSize: "3rem",
  };

  const subtitleStyle = {
    color: "#00b8ff",
    fontSize: "2rem",
    margin: "2rem",
  };

  const buttonStyle = {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#172d66", 
    color: "#ffffff", 
    border: "none",
    borderRadius: "0.25rem",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#cb0980", 
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>{error.data}</h1>
        <h2 style={subtitleStyle}>
          {error.status} - {error.statusText}
        </h2>
        <p>
          <a href="/" style={buttonStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>
            Go Back Home
          </a>
        </p>
      </div>
    </div>
  );
}

export default RoutingError;
