import React, { useState, useCallback, useRef } from 'react';
import './Modal.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Modal = ({ showModal, setShowModal, userId }) => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: '',
    imageUrl: '',
    userId: localStorage.getItem('userId') // Include userId here
  });

  const editorRef = useRef(); // Ref to store the CKEditor instance

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventData({
  //     ...eventData,
  //     [name]: stripHtmlTags(value),
  //   });
  // };

  // Memoize the handleChange function to avoid creating it on every render
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,  // Store raw HTML content here
    }));
  }, []);


  // Get the current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("Enter "+localStorage.getItem('userId'))
    try {
    //   const { userId, ...eventDataWithoutUserId } = eventData;
      const response = await fetch(`${BASE_URL}/api/events/${localStorage.getItem('userId')}`, {
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
          imageUrl: '',
          userId: userId // Reset userId
        });
        toast.success("Event Created Successfully!");
        setTimeout(() => {
          window.location.href = '/events';
        }, 1000); // Delay to allow toast to display before redirecting
        setShowModal(false);
      } else {
        console.error('Failed to create event');
        toast.error('Failed to create event!');
        setTimeout(() => {
          window.location.href = '/events';
        }, 1000); // Delay to allow toast to display before redirecting
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed');
      setTimeout(() => {
        window.location.href = '/events';
      }, 1000); // Delay to allow toast to display before redirecting
    }
  };

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Automatically upload the file as soon as it's selected
    if (selectedFile) {
        await handleUpload(selectedFile);
    }
  };

const handleUpload = async (selectedFile) => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        const response = await fetch(`${BASE_URL}/api/events/img/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.text();
        setImageUrl(data); // Use secure_url from Cloudinary response
        console.log(setImageUrl);

        // // Store the imageUrl and eventId in localStorage
        // const eventId = localStorage.getItem('eventId'); // Ensure eventId is set properly
        // localStorage.setItem(`imageUrl`, setImageUrl);
    } catch (error) {
        console.error('Image upload failed:', error);
    }
};

  return (
    <div className={`modal ${showModal ? 'show' : 'hide'}`} onClick={() => setShowModal(false)}>
      <div className="modal-content" style={{backgroundColor:'#e7f1f2'}} onClick={(e) => e.stopPropagation()}>
      <ToastContainer />
        <div className='d-flex' style={{justifyContent:'space-between' ,alignItems:'center'}}>
          <h2 className="modal-title1" style={{color:'#1F316F', fontSize:'30px'}}>Add New Event</h2>
          <div className="closeMark" style={{fontSize:'25px', cursor:'pointer', color:'#1F316F'}} onClick={() => setShowModal(false)}><i class="bi bi-x-circle"></i></div>
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
              min={today} // Disable dates before today
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
          
          <div>
            <input type="file" onChange={handleFileChange} />
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
          </div>
          <div className="modal-buttons">
            <button type="submit" className="" style={{backgroundColor:'#1F316F'}}>Create Event</button>
            <button type="button" className="close-button" style={{backgroundColor:'#1F316F'}} onClick={() => setShowModal(false)}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};
