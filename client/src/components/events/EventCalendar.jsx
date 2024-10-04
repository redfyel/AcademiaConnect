import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button } from 'react-bootstrap';
import './EventCalendar.css'; // Import your custom styles

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
    <div className='event-calendar-container'>
      <h2 className='calendar-title'>Events Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, padding: '10px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        onSelectEvent={handleEventClick}
        views={['month']}
        className='custom-calendar' // Add a custom class for styling
      />

      {selectedEvent && (
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
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
