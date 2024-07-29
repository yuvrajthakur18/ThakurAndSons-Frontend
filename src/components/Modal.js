import React, { useState } from 'react';
import './Modal.css';

export const Modal = ({ showModal, setShowModal, userId }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: '',
    userId: localStorage.getItem('userId') // Include userId here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const { userId, ...eventDataWithoutUserId } = eventData;
      const response = await fetch(`http://localhost:8080/api/events/${localStorage.getItem('userId')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Event created:', result);
        setEventData({
          name: '',
          description: '',
          date: '',
          location: '',
          category: '',
          userId: userId // Reset userId
        });
        setShowModal(false);
        // Optionally, trigger a refresh of events here
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`modal ${showModal ? 'show' : 'hide'}`} onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={() => setShowModal(false)}>×</span>
        <h2 className="modal-title">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Event Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Event Name"
              value={eventData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              value={eventData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="YYYY-MM-DD"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Event Location"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Event Category"
              value={eventData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" className="close-button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};
