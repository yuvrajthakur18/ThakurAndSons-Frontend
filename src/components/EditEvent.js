import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Modal.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const EditEvent = ({ showEditModal, setShowEditModal, eventId }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: '',
    userId: localStorage.getItem('userId') // Include userId here
  });

  useEffect(() => {
    if (eventId) {
      fetchEventDetails(eventId);
    }
  }, [eventId]);

  const editorRef = useRef(); // Ref to store the CKEditor instance

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  };

  const fetchEventDetails = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/${id}`);
      if (response.ok) {
        const event = await response.json();
        setEventData(event);
      } else {
        console.error('Failed to fetch event details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventData({
  //     ...eventData,
  //     [name]: value
  //   });
  // };

  //Memoize the handleChange function to avoid creating it on every render
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEventData((prevData) => {
      const strippedValue = stripHtmlTags(value);
      if (prevData[name] === strippedValue) {
        return prevData; // Prevent unnecessary state update if value hasn't changed
      }
      return {
        ...prevData,
        [name]: strippedValue,
      };
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Event updated:', result);
        setEventData({
          name: '',
          description: '',
          date: '',
          location: '',
          category: '',
          userId: localStorage.getItem('userId') // Reset userId
        });
        setShowEditModal(false);
        // Optionally, trigger a refresh of events here
      } else {
        console.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${BASE_URL}/api/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type' should not be set explicitly for FormData when using fetch
            }
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        setImageUrl(data);
    } catch (error) {
        console.error('Image upload failed:', error);
    }
};

  return (
    <div className={`modal ${showEditModal ? 'show' : 'hide'}`} onClick={() => setShowEditModal(false)}>
      <div className="modal-content" style={{backgroundColor:'#e7f1f2'}} onClick={(e) => e.stopPropagation()}>
        <div className='d-flex' style={{justifyContent:'space-between' ,alignItems:'center'}}>
          <h2 className="modal-title1" style={{color:'#1F316F', fontSize:'30px'}}>Edit Event</h2>
          <div className="closeMark" style={{fontSize:'25px', cursor:'pointer', color:'#1F316F'}} onClick={() => setShowEditModal(false)}><i class="bi bi-x-circle"></i></div>
        </div>
        <form onSubmit={handleSubmit} style={{color:'#1F316F'}}>
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
            <CKEditor
              editor={ClassicEditor}
              onReady={(editor) => {
                editorRef.current = editor; // Store editor instance in ref
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleChange({ target: { name: 'description', value: data } });
              }}
              config={{
                placeholder: 'Event Description',
              }}
            />
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
              min={new Date().toISOString().split('T')[0]} // Disable dates before today
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
            <select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="alumini">Alumini Meets</option>
              <option value="concert">Concert</option>
              <option value="tech">Tech Seminar</option>
              <option value="get_together">Small Get Together</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit" style={{backgroundColor:'#1F316F'}}>Save Changes</button>
            <button type="button" className="close-button" style={{backgroundColor:'#1F316F'}} onClick={() => setShowEditModal(false)}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};
