import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button } from "react-bootstrap";
import "./EventCalendar.css";

const localizer = momentLocalizer(moment);

function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="event-calendar-container">
      <h2 className="calendar-title">Explore this month's events at PVPSIT</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 600,
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
        onSelectEvent={handleEventClick}
        views={["month"]}
        className="custom-calendar"
      />

      {selectedEvent && (
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">
              {selectedEvent.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <img src={selectedEvent.img} alt="Event" />
            <p>
              <strong>Timings:</strong>{" "}
              {moment(selectedEvent.start).format("LLL")} -{" "}
              {moment(selectedEvent.end).format("LLL")}
            </p>
            <p>
              <strong>Conducted by:</strong> {selectedEvent.conductedBy}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            <p>
              <strong>Location:</strong> {selectedEvent.location}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <a
              className="r-btn"
              href={selectedEvent.registrationLink}
              target="_blank"
            >
              Register
            </a>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default EventCalendar;
