import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch events from the backend
    axios.get('http://localhost:4000/events-api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleEventClick = event => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />

      {selectedEvent && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Timings:</strong> {moment(selectedEvent.start).format('LLL')} - {moment(selectedEvent.end).format('LLL')}</p>
            <p><strong>Conducted by:</strong> {selectedEvent.conductedBy}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" href={selectedEvent.registrationLink}>
              Register
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default EventCalendar;
