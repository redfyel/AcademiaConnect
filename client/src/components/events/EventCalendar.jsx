import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import "./EventCalendar.css";

const localizer = momentLocalizer(moment);

function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [areEventsVisible, setAreEventsVisible] = useState(true); // State for event visibility

  useEffect(() => {
    async function fetchEvents() {
      let res = await fetch("http://localhost:4000/events-api/events");
      const data = await res.json();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const upcomingEvents = events.filter((event) => moment(event.start).isAfter(moment()));
  const pastEvents = events.filter((event) => moment(event.start).isBefore(moment()));

  const completedEvents = pastEvents.length;
  const totalEvents = events.length;
  const progress = Math.round((completedEvents / totalEvents) * 100);

  const toggleEventsVisibility = () => {
    setAreEventsVisible(!areEventsVisible); // Toggle events visibility
  };

  return (
    <div>
       <button className="toggle-btn" onClick={toggleEventsVisibility}>
          {areEventsVisible ? 'Hide Events' : 'Show Events'}
        </button>
    <div className="event-calendar-page">
      
      <div className={`left-section ${areEventsVisible ? '' : 'collapsed'}`}>
       
        {areEventsVisible && (
          <>
            <div className="upcoming-events scrollable mb-5">
              <h3>Upcoming Events</h3>
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <h4>{event.title}</h4>
                  <p>{moment(event.start).format("LL")}</p>
                </div>
              ))}
            </div>
            <div className="past-events scrollable">
              <h3>Past Events</h3>
              {pastEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <h4>{event.title}</h4>
                  <p>{moment(event.start).format("LL")}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={`right-section ${areEventsVisible ? '' : 'centered'}`}>
        <h2 className="calendar-title">Explore this month's events</h2>

        {/* Event Progress */}
        <ProgressBar now={progress} label={`${progress}% of events completed`} className="progress-bar-custom" />

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: "75vh", // Adjust height for better space utilization
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            padding: "10px",
          }}
          onSelectEvent={handleEventClick}
          views={["month"]}
          className="custom-calendar"
        />

        {selectedEvent && (
          <Modal show={showModal} onHide={closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedEvent.img} alt="Event" className="event-img" />
              <p><strong>Timings:</strong> {moment(selectedEvent.start).format("LLL")} - {moment(selectedEvent.end).format("LLL")}</p>
              <p><strong>Conducted by:</strong> {selectedEvent.conductedBy}</p>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
            </Modal.Body>
            <Modal.Footer>
              <a href={selectedEvent.registrationLink} target="_blank" className="r-btn">Register</a>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
    </div>
  );
}

export default EventCalendar;
