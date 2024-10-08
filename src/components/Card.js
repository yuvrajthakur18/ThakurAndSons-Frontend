import React, { useState, useEffect } from 'react';
import './Card.css';
import { Modal } from './Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Card = () => {
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to keep track of which event is being confirmed
  const [myCreatedEvents, setMyCreatedEvents] = useState([]);
  const [myRegisteredEvents, setMyRegisteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [user, setUser] = useState({ username: '', email: '', userId: '' });
  const [isHomepage, setIsHomepage] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editEventData, setEditEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: '',
    imageUrl:''
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      fetchUserInfo(storedUsername);
    }
    fetchAllEvents();

    // Check if current URL is homepage
    setIsHomepage(window.location.pathname === '/');
  }, []);

  const userId = localStorage.getItem('userId')
  useEffect(() => {
    if (userId) {
      fetchUserEvents(userId);
      fetchUserRegisteredEvents(userId);
    }
  }, [userId]);
  
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  const fetchUserInfo = async (username) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/user/${username}`);
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        console.error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/all`);
      if (response.ok) {
        const events = await response.json();
        setAllEvents(events);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/user/${localStorage.getItem('userId')}`);
      if (response.ok) {
        const createdEvents = await response.json();
        setMyCreatedEvents(createdEvents);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserRegisteredEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/user/${localStorage.getItem('userId')}/registered-events`);
      if (response.ok) {
        const registeredEvents = await response.json();
        setMyRegisteredEvents(registeredEvents);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddEventClick = () => {
    setShowModal(true);
  };

  const confirmation = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true); // Show the confirmation modal
  };
  
  const ConfirmationModal = ({ show, onHide, onConfirm }) => (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{backgroundColor: "#e7f1f2"}}>
          <div className="modal-header ">
            <h5 className="modal-title">Confirm Save</h5>
            <button type="button" className="close" onClick={onHide} aria-label="Close" style={{backgroundColor:'transparent', marginTop:'10px'}}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Do you want to save these changes?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={onConfirm}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
  


  const handleEditEventClick = (event) => {
    setEditingEventId(event.id);
    setSelectedEvent(event); // Set the selected event
    localStorage.setItem('eventId', event.id);
    setEditEventData({
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      category: event.category,
      imageUrl: event.imageUrl
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEventData({
      ...editEventData,
      [name]: value
    });
  };

  const handleSaveChanges = async (e) => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/${editingEventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editEventData)
      });
      if (response.ok) {
        toast.success("Event Updated Succesfully!")
        setTimeout(() => {
          window.location.href = '/events';
        }, 1000); // Delay to allow toast to display before redirecting
        const updatedEvent = await response.json();
        setMyCreatedEvents((prevEvents) =>
          prevEvents.map((event) => (event.id === editingEventId ? updatedEvent : event))
        );
        setEditingEventId(null);
      } else {
        console.error('Failed to update event');
        toast.error("Failed to update event!")
        setTimeout(() => {
          window.location.href = '/events';
        }, 1000); // Delay to allow toast to display before redirecting
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed!")
      setTimeout(() => {
        window.location.href = '/events';
      }, 1000); // Delay to allow toast to display before redirecting
    }
  };

  const handleCancelEdit = (eventId) => {
    setEditingEventId(null);
    setEditEventData({
      name: '',
      description: '',
      date: '',
      location: '',
      category: '',
      imageUrl: ''
    });
  };  

  const handleDelete = (eventId) => {
    // Send a DELETE request to the backend
    fetch(`${BASE_URL}/api/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        toast.success("Event Deleted Successfully!");
        setTimeout(() => {
          window.location.href = '/events';
        }, 1000); // Delay to allow toast to display before redirecting
        // Remove the deleted event from the state
        setMyCreatedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        
      } else {
        console.error('Failed to delete the event.');
        toast.error("Failed to delete the event!");
        setTimeout(() => {
          window.location.href = '/events';
        }, 1000); // Delay to allow toast to display before redirecting
      }
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Failed!");
      setTimeout(() => {
        window.location.href = '/events';
      }, 1000); // Delay to allow toast to display before redirecting
    });
  };
  

  const categoryImages = {
    anniversary: "/anniversary.jpg",
    concert: "/concert.jpg",
    tech: "/tech.jpg",
    get_together: "/get_together.jpg",
    wedding: "/weddings.jpg",
    other: "/other.jpg",
  };

  const handleRegister = async (eventId) => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID
  
    try {
      const response = await fetch(`${BASE_URL}/api/events/register/${userId}/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   userId,
        //   eventId
        // }),
      });
      
      if (response.ok) {
        toast.success('Successfully registered for the event!');
        console.log("Registered for Event");
        setTimeout(() => {
          window.location.href = '/events';
        }, 1500); // Delay to allow toast to display before redirecting
      }
      else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error('Login to Register!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000); // Delay to allow toast to display before redirecting
    }
  };

  return (
  <div style={{backgroundColor:'white', padding:'10px 0', marginTop:'-30px'}}>
    <ToastContainer />
    <section className="wrapper">
      <div className="container">
        {/* User Info Header */}
        <div>
          <h2 className='bona-nova-sc-regular' style={{fontSize:'45px', letterSpacing:'4px'}}>
            {" "|| 'OUR EVENTS'}
          </h2>
        </div>

        <div className="row">
          {/* Conditionally render My Events Section */}
          {!isHomepage && (
            <div className="my-events-section">
              <div className='d-flex justify-content-between' style={{ alignItems: 'center' }}>
                <h2 className='bona-nova-sc-regular' style={{ fontSize: '35px', letterSpacing: '3px', color: 'gray', font: 'lighter', textTransform: 'uppercase' }}>{username}'s Events</h2>
                <button
                  className="btn btn-outline"
                  style={{ backgroundColor: 'transparent', color: '#1F316F' }}
                  onClick={handleAddEventClick}
                >
                  <i className="bi bi-plus-circle-dotted" style={{ fontSize: '50px' }}></i>
                </button>
              </div>
              <div className="row">
                {myCreatedEvents.length === 0 ? (
                  <div className="col-12">
                    <p>No Events to show</p>
                  </div>
                ) : (
                  myCreatedEvents.map((event, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-6 mb-4 p-2">
                      <div
                        className="card text-dark card-has-bg click-col"
                        style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
                      >
                        <div className="card-img-overlay d-flex flex-column pt-0">
                          <div className="card-body">
                            {editingEventId === event.id ? (
                              <form>
                                <div className="form-group">
                                  <label htmlFor="name">Event Name:</label>
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editEventData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="description">Description:</label>
                                  <textarea
                                    id="description"
                                    name="description"
                                    value={(editEventData.description)}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                  ></textarea>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="date">Date:</label>
                                  <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={editEventData.date}
                                    onChange={handleChange}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="location">Location:</label>
                                  <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={editEventData.location}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="category">Category:</label>
                                  <select
                                    id="category"
                                    name="category"
                                    value={editEventData.category}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                  >
                                    <option value="" disabled>Select Category</option>
                                    <option value="anniversary">B'Day/Anniversary</option>
                                    <option value="concert">Concert</option>
                                    <option value="tech">Tech Seminar</option>
                                    <option value="get_together">Small Get Together</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <button type="submit" className="btn btn-success" onClick={confirmation}>Save Changes</button>
                                  <button type="button" className="btn btn-secondary" onClick={() => handleCancelEdit(event.id)}>Cancel</button>
                                </div>
                              </form>
                            ) : (
                              <div className=''>
                                <div style={{ paddingLeft: '3px', fontSize: '20px' }}>
                                  <h3 className="card-meta">{event.category}</h3>
                                </div>
                                <div className='d-flex justify-content-center'>
                                  <img
                                    src={event.imageUrl || "/default.jpg"} // Use Cloudinary image, category image, or default image
                                    alt='EventImage'
                                    width="575px"
                                    height="300px"
                                    style={{borderRadius:"10px", boxShadow:"1px 1px 6px grey"}}
                                  />
                                </div>
                                <div style={{ paddingTop: '10px', paddingLeft: '3px', fontSize: '20px' }}>
                                  <h3 style={{ fontSize: '18px', color: 'black', letterSpacing: '5px', fontWeight: 'light', paddingLeft: '3px' }} className='bona-nova-sc-bold'>{event.name}</h3>
                                </div>
                                <div style={{ paddingLeft: '7px' }}>
                                  <small><i className="far fa-clock"></i> {event.date}</small>
                                  {/* <p className="mt-1" style={{ fontStyle: 'italic' }}>{event.description}</p> */}
                                  <p className="mt-1" dangerouslySetInnerHTML={renderHTML(event.description)}></p>
                                </div>
                              </div>

                            )}
                          </div>
                          <div className="card-footer d-flex justify-content-around" style={{ paddingTop: '0px' }}>
                            {/* Register for event button */}
                            <button onClick={() => handleRegister(event.id)} className="btn btn-secondary" style={{ backgroundColor: 'transparent', color: '#1F316F' }}>Register for Event</button>
                            {/* Edit Event button  */}
                            <button className="btn btn-secondary" onClick={() => handleEditEventClick(event)}style={{ backgroundColor: 'transparent', color: 'green', width: '12%' }}>
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            {/* Delete Event button  */}
                            <button className="btn btn-secondary" onClick={() => handleDelete(event.id)} style={{ backgroundColor: 'transparent', color: 'red', width: '15%' }}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Conditionally render My Registered Events Section */}
          {!isHomepage && (
            <div className="my-events-section">
              <div className='d-flex justify-content-between' style={{ alignItems: 'center' }}>
                <h2 className='bona-nova-sc-regular' style={{ fontSize: '35px', letterSpacing: '3px', color: 'gray', font: 'lighter', textTransform: 'uppercase' }}>{username}'s Registered Events</h2>
              </div>
              <div className="row">
                {myRegisteredEvents.length === 0 ? (
                  <div className="col-12">
                    <p>No Events to show</p>
                  </div>
                ) : (
                  myRegisteredEvents.map((event, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-6 mb-4 p-2">
                      <div
                        className="card text-dark card-has-bg click-col"
                        style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
                      >
                        <div className="card-img-overlay d-flex flex-column pt-0">
                          <div className="card-body">
                            {editingEventId === event.id ? (
                              <form onSubmit={handleSaveChanges}>
                                <div className="form-group">
                                  <label htmlFor="name">Event Name:</label>
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={editEventData.name}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="description">Description:</label>
                                  <textarea
                                    id="description"
                                    name="description"
                                    value={editEventData.description}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                  ></textarea>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="date">Date:</label>
                                  <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={editEventData.date}
                                    onChange={handleChange}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="location">Location:</label>
                                  <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={editEventData.location}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="category">Category:</label>
                                  <select
                                    id="category"
                                    name="category"
                                    value={editEventData.category}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                  >
                                    <option value="" disabled>Select Category</option>
                                    <option value="anniversary">B'Day/Anniversary</option>
                                    <option value="concert">Concert</option>
                                    <option value="tech">Tech Seminar</option>
                                    <option value="get_together">Small Get Together</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <button type="submit" className="btn btn-success">Save Changes</button>
                                  <button type="button" className="btn btn-secondary" onClick={() => handleCancelEdit(event.id)}>Cancel</button>
                                </div>
                              </form>
                            ) : (
                              <div className=''>
                                <div style={{ paddingLeft: '3px', fontSize: '20px' }}>
                                  <h3 className="card-meta">{event.category}</h3>
                                </div>
                                <div className='d-flex justify-content-center'>
                                  <img
                                    src={event.imageUrl || categoryImages[event.category] || "/default.jpg"} // Use default image if category is not found
                                    alt='EventImage'
                                    width="575px"
                                    height="300px"
                                    style={{borderRadius:"10px", boxShadow:"1px 1px 6px grey"}}
                                  />
                                </div>
                                <div style={{ paddingTop: '10px', paddingLeft: '3px', fontSize: '20px' }}>
                                  <h3 style={{ fontSize: '18px', color: 'black', letterSpacing: '5px', fontWeight: 'light', paddingLeft: '3px' }} className='bona-nova-sc-bold'>{event.name}</h3>
                                </div>
                                <div style={{ paddingLeft: '7px' }}>
                                  <small><i className="far fa-clock"></i> {event.date}</small>
                                  <p className="mt-1" style={{ fontStyle: 'italic' }}>{event.description}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="card-footer d-flex justify-content-around" style={{ paddingTop: '0px' }}>
                            {/* Registered for event button */}
                            <button className="btn btn-secondary" style={{ backgroundColor: 'transparent', color: 'green' }}>Registered</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* All Events Section */}
          <div className="my-events-section">
          <h2 className='bona-nova-sc-regular' style={{fontSize:'35px', letterSpacing:'3px', color:'gray', font:'lighter', textTransform: 'uppercase', paddingTop:'100px'}}>All Events</h2>
            <div className="row">
              {allEvents.length === 0 ? (
                <div className="col-12">
                  <p>No Events to show</p>
                </div>
              ) : (
                allEvents.map((event, index) => (
                  <div key={index} className="col-sm-12 col-md-6 col-lg-6 mb-4 p-2">
                    <div
                      className="card text-dark card-has-bg click-col"
                      style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')"}}
                    >
                      <div className="card-img-overlay d-flex flex-column pt-0">
                        <div className="card-body">
                          <div className=''>
                            <div style={{paddingLeft:'3px', fontSize:'20px'}}>
                              <h3 className="card-meta">{event.category}</h3>
                            </div>
                            <div className='d-flex justify-content-center' >
                              <img
                                src={event.imageUrl || categoryImages[event.category] || "/default.jpg"} // Use default image if category is not found
                                alt='EventImage'
                                width="575px"
                                height="300px"
                                style={{borderRadius:"10px", boxShadow:"1px 1px 6px grey"}}
                              />
                            </div>
                            <div style={{paddingTop:'10px' ,paddingLeft:'3px', fontSize:'20px' }}>
                              <h3 style={{fontSize: '18px', color:'black', letterSpacing:'5px', fontWeight:'light', paddingLeft:'3px'}} className='bona-nova-sc-bold'>{event.name}</h3>
                            </div>
                            <div style={{paddingLeft:'7px'}}>
                              <small><i className="far fa-clock"></i> {event.date}</small>
                              <p className="mt-1" style={{fontStyle:'italic'}}>{event.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer d-flex justify-content-center" style={{paddingTop:'0px'}}>
                          {/* Register for event button */}
                          <button onClick={() => handleRegister(event.id)} className="btn btn-secondary " style={{ backgroundColor: 'transparent', color: '#1F316F' }}>Register for Event</button>
                          <ToastContainer />
                          {/*Show Event Button*/}

                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
          show={showConfirmationModal}
          onHide={() => setShowConfirmationModal(false)}
          onConfirm={() => {
            handleSaveChanges();
            setShowConfirmationModal(false);
          }}
      />
      <Modal showModal={showModal} setShowModal={setShowModal} userId={user.userId} />
    </section></div>
  );
};


// import React, { useState, useEffect } from 'react';
// import './Card.css';
// import { Modal } from './Modal';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const Card = () => {
//   const [username, setUsername] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null); // State to keep track of which event is being confirmed
//   const [myCreatedEvents, setMyCreatedEvents] = useState([]);
//   const [myRegisteredEvents, setMyRegisteredEvents] = useState([]);
//   const [allEvents, setAllEvents] = useState([]);
//   const [user, setUser] = useState({ username: '', email: '', userId: '' });
//   const [isHomepage, setIsHomepage] = useState(false);
//   const [editingEventId, setEditingEventId] = useState(null);
//   const [editEventData, setEditEventData] = useState({
//     name: '',
//     description: '',
//     date: '',
//     location: '',
//     category: '',
//     imageUrl:''
//   });

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setUsername(storedUsername);
//       fetchUserInfo(storedUsername);
//     }
//     fetchAllEvents();

//     // Check if current URL is homepage
//     setIsHomepage(window.location.pathname === '/');
//   }, []);

//   const userId = localStorage.getItem('userId')
//   useEffect(() => {
//     if (userId) {
//       fetchUserEvents(userId);
//       fetchUserRegisteredEvents(userId);
//     }
//   }, [userId]);
  
//   const renderHTML = (htmlString) => {
//     return { __html: htmlString };
//   };

//   const fetchUserInfo = async (username) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/auth/user/${username}`);
//       if (response.ok) {
//         const user = await response.json();
//         setUser(user);
//       } else {
//         console.error('Failed to fetch user info');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const fetchAllEvents = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/events/all`);
//       if (response.ok) {
//         const events = await response.json();
//         setAllEvents(events);
//       } else {
//         console.error('Failed to fetch events');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const fetchUserEvents = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/events/user/${localStorage.getItem('userId')}`);
//       if (response.ok) {
//         const createdEvents = await response.json();
//         setMyCreatedEvents(createdEvents);
//       } else {
//         console.error('Failed to fetch events');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const fetchUserRegisteredEvents = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/events/user/${localStorage.getItem('userId')}/registered-events`);
//       if (response.ok) {
//         const registeredEvents = await response.json();
//         setMyRegisteredEvents(registeredEvents);
//       } else {
//         console.error('Failed to fetch events');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleAddEventClick = () => {
//     setShowModal(true);
//   };

//   const confirmation = (event) => {
//     setSelectedEvent(event); // Set the event that is being edited
//     setShowConfirmationModal(true); // Show the confirmation modal
//   };
  
//   const ConfirmationModal = ({ show, onHide, onConfirm }) => (
//   <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//     <div className="modal-dialog" role="document">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title">Confirm Edit</h5>
//           <button type="button" className="close" onClick={onHide} aria-label="Close">
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <div className="modal-body">
//           <p>Do you want to edit this event?</p>
//         </div>
//         <div className="modal-footer">
//           <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
//           <button type="button" className="btn btn-primary" onClick={onConfirm}>Save</button>
//         </div>
//       </div>
//     </div>
//   </div>
// );


//   const handleEditEventClick = (event) => {
//     setEditingEventId(event.id);
//     localStorage.setItem('eventId', event.id);
//     setEditEventData({
//       name: event.name,
//       description: event.description,
//       date: event.date,
//       location: event.location,
//       category: event.category,
//       imageUrl: event.imageUrl
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditEventData({
//       ...editEventData,
//       [name]: value
//     });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${BASE_URL}/api/events/${editingEventId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(editEventData)
//       });
//       if (response.ok) {
//         toast.success("Event Updated Succesfully!")
//         setTimeout(() => {
//           window.location.href = '/events';
//         }, 1000); // Delay to allow toast to display before redirecting
//         const updatedEvent = await response.json();
//         setMyCreatedEvents((prevEvents) =>
//           prevEvents.map((event) => (event.id === editingEventId ? updatedEvent : event))
//         );
//         setEditingEventId(null);
//       } else {
//         console.error('Failed to update event');
//         toast.error("Failed to update event!")
//         setTimeout(() => {
//           window.location.href = '/events';
//         }, 1000); // Delay to allow toast to display before redirecting
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error("Failed!")
//       setTimeout(() => {
//         window.location.href = '/events';
//       }, 1000); // Delay to allow toast to display before redirecting
//     }
//   };

//   const handleCancelEdit = (eventId) => {
//     setEditingEventId(null);
//     setEditEventData({
//       name: '',
//       description: '',
//       date: '',
//       location: '',
//       category: '',
//       imageUrl: ''
//     });
//   };  

//   const handleDelete = (eventId) => {
//     // Send a DELETE request to the backend
//     fetch(`${BASE_URL}/api/events/${eventId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then(response => {
//       if (response.ok) {
//         toast.success("Event Deleted Successfully!");
//         setTimeout(() => {
//           window.location.href = '/events';
//         }, 1000); // Delay to allow toast to display before redirecting
//         // Remove the deleted event from the state
//         setMyCreatedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        
//       } else {
//         console.error('Failed to delete the event.');
//         toast.error("Failed to delete the event!");
//         setTimeout(() => {
//           window.location.href = '/events';
//         }, 1000); // Delay to allow toast to display before redirecting
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       toast.error("Failed!");
//       setTimeout(() => {
//         window.location.href = '/events';
//       }, 1000); // Delay to allow toast to display before redirecting
//     });
//   };
  

//   const categoryImages = {
//     anniversary: "/anniversary.jpg",
//     concert: "/concert.jpg",
//     tech: "/tech.jpg",
//     get_together: "/get_together.jpg",
//     wedding: "/weddings.jpg",
//     other: "/other.jpg",
//   };

//   const handleRegister = async (eventId) => {
//     const userId = localStorage.getItem('userId'); // Retrieve user ID
  
//     try {
//       const response = await fetch(`${BASE_URL}/api/events/register/${userId}/${eventId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // body: JSON.stringify({
//         //   userId,
//         //   eventId
//         // }),
//       });
      
//       if (response.ok) {
//         toast.success('Successfully registered for the event!');
//         console.log("Registered for Event");
//         setTimeout(() => {
//           window.location.href = '/events';
//         }, 1500); // Delay to allow toast to display before redirecting
//       }
//       else {
//         throw new Error('Network response was not ok');
//       }
//     } catch (error) {
//       console.error('Error registering for event:', error);
//       toast.error('Login to Register!');
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 1000); // Delay to allow toast to display before redirecting
//     }
//   };

//   return (
//   <div style={{backgroundColor:'white', padding:'10px 0', marginTop:'-30px'}}>
//     <ToastContainer />
//     <section className="wrapper">
//       <div className="container">
//         {/* User Info Header */}
//         <div>
//           <h2 className='bona-nova-sc-regular' style={{fontSize:'45px', letterSpacing:'4px'}}>
//             {" "|| 'OUR EVENTS'}
//           </h2>
//         </div>

//         <div className="row">
//           {/* Conditionally render My Events Section */}
//           {!isHomepage && (
//             <div className="my-events-section">
//               <div className='d-flex justify-content-between' style={{ alignItems: 'center' }}>
//                 <h2 className='bona-nova-sc-regular' style={{ fontSize: '35px', letterSpacing: '3px', color: 'gray', font: 'lighter', textTransform: 'uppercase' }}>{username}'s Events</h2>
//                 <button
//                   className="btn btn-outline"
//                   style={{ backgroundColor: 'transparent', color: '#1F316F' }}
//                   onClick={handleAddEventClick}
//                 >
//                   <i className="bi bi-plus-circle-dotted" style={{ fontSize: '50px' }}></i>
//                 </button>
//               </div>
//               <div className="row">
//                 {myCreatedEvents.length === 0 ? (
//                   <div className="col-12">
//                     <p>No Events to show</p>
//                   </div>
//                 ) : (
//                   myCreatedEvents.map((event, index) => (
//                     <div key={index} className="col-sm-12 col-md-6 col-lg-6 mb-4 p-2">
//                       <div
//                         className="card text-dark card-has-bg click-col"
//                         style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
//                       >
//                         <div className="card-img-overlay d-flex flex-column pt-0">
//                           <div className="card-body">
//                             {editingEventId === event.id ? (
//                               <form onSubmit={handleSaveChanges}>
//                                 <div className="form-group">
//                                   <label htmlFor="name">Event Name:</label>
//                                   <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     value={editEventData.name}
//                                     onChange={handleChange}
//                                     required
//                                     className="form-control"
//                                   />
//                                 </div>
//                                 <div className="form-group">
//                                   <label htmlFor="description">Description:</label>
//                                   <textarea
//                                     id="description"
//                                     name="description"
//                                     value={(editEventData.description)}
//                                     onChange={handleChange}
//                                     required
//                                     className="form-control"
//                                   ></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                   <label htmlFor="date">Date:</label>
//                                   <input
//                                     type="date"
//                                     id="date"
//                                     name="date"
//                                     value={editEventData.date}
//                                     onChange={handleChange}
//                                     required
//                                     min={new Date().toISOString().split('T')[0]}
//                                     className="form-control"
//                                   />
//                                 </div>
//                                 <div className="form-group">
//                                   <label htmlFor="location">Location:</label>
//                                   <input
//                                     type="text"
//                                     id="location"
//                                     name="location"
//                                     value={editEventData.location}
//                                     onChange={handleChange}
//                                     required
//                                     className="form-control"
//                                   />
//                                 </div>
//                                 <div className="form-group">
//                                   <label htmlFor="category">Category:</label>
//                                   <select
//                                     id="category"
//                                     name="category"
//                                     value={editEventData.category}
//                                     onChange={handleChange}
//                                     required
//                                     className="form-control"
//                                   >
//                                     <option value="" disabled>Select Category</option>
//                                     <option value="anniversary">B'Day/Anniversary</option>
//                                     <option value="concert">Concert</option>
//                                     <option value="tech">Tech Seminar</option>
//                                     <option value="get_together">Small Get Together</option>
//                                     <option value="wedding">Wedding</option>
//                                     <option value="other">Other</option>
//                                   </select>
//                                 </div>
//                                 <div className="d-flex justify-content-between">
//                                   <button type="submit" className="btn btn-success">Save Changes</button>
//                                   <button type="button" className="btn btn-secondary" onClick={() => handleCancelEdit(event.id)}>Cancel</button>
//                                 </div>
//                               </form>
//                             ) : (
//                               <div className=''>
//                                 <div style={{ paddingLeft: '3px', fontSize: '20px' }}>
//                                   <h3 className="card-meta">{event.category}</h3>
//                                 </div>
//                                 <div className='d-flex justify-content-center'>
//                                   <img
//                                     src={event.imageUrl || "/default.jpg"} // Use Cloudinary image, category image, or default image
//                                     alt='EventImage'
//                                     width="575px"
//                                     height="300px"
//                                     style={{borderRadius:"10px", boxShadow:"1px 1px 6px grey"}}
//                                   />
//                                 </div>
//                                 <div style={{ paddingTop: '10px', paddingLeft: '3px', fontSize: '20px' }}>
//                                   <h3 style={{ fontSize: '18px', color: 'black', letterSpacing: '5px', fontWeight: 'light', paddingLeft: '3px' }} className='bona-nova-sc-bold'>{event.name}</h3>
//                                 </div>
//                                 <div style={{ paddingLeft: '7px' }}>
//                                   <small><i className="far fa-clock"></i> {event.date}</small>
//                                   {/* <p className="mt-1" style={{ fontStyle: 'italic' }}>{event.description}</p> */}
//                                   <p className="mt-1" dangerouslySetInnerHTML={renderHTML(event.description)}></p>
//                                 </div>
//                               </div>

//                             )}
//                           </div>
//                           <div className="card-footer d-flex justify-content-around" style={{ paddingTop: '0px' }}>
//                             {/* Register for event button */}
//                             <button onClick={() => handleRegister(event.id)} className="btn btn-secondary" style={{ backgroundColor: 'transparent', color: '#1F316F' }}>Register for Event</button>
//                             {/* Edit Event button  */}
//                             <button className="btn btn-secondary" onClick={() => handleEditEventClick(event)}style={{ backgroundColor: 'transparent', color: 'green', width: '12%' }}>
//                               <i className="bi bi-pencil-square"></i>
//                             </button>
//                             {/* Delete Event button  */}
//                             <button className="btn btn-secondary" onClick={() => handleDelete(event.id)} style={{ backgroundColor: 'transparent', color: 'red', width: '15%' }}>
//                               <i className="bi bi-trash"></i>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Conditionally render My Registered Events Section */}
//           {!isHomepage && (
//             <div className="my-events-section">
//               <div className='d-flex justify-content-between' style={{ alignItems: 'center' }}>
//                 <h2 className='bona-nova-sc-regular' style={{ fontSize: '35px', letterSpacing: '3px', color: 'gray', font: 'lighter', textTransform: 'uppercase' }}>{username}'s Registered Events</h2>
//               </div>
//               <div className="row">
//                 {myRegisteredEvents.length === 0 ? (
//                   <div className="col-12">
//                     <p>No Events to show</p>
//                   </div>
//                 ) : (
//                   myRegisteredEvents.map((event, index) => (
//                     <div key={index} className="col-sm-12 col-md-6 col-lg-6 mb-4 p-2">
//                       <div
//                         className="card text-dark card-has-bg click-col"
//                         style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
//                       >
//                         <div className="card-img-overlay d-flex flex-column pt-0">
//                           <div className="card-body">
//                             {editingEventId === event.id ? (
//                               <form onSubmit={handleSaveChanges}>
//                                 <div className="form-group">
//                                   <label htmlFor="name">Event Name:</label>
//                                   <input
//                                     type="text"
//                                     id="name"
//                                     name="name"
//                                     value={editEventData.name}
//                                     onChange={handleChange}
//                                     required
//                                     className="form-control"
//                                   />
//                                 </div>
//                                 <div className="form-group">
//                                   <label htmlFor="description">Description:</label>
//                                   <textarea
//                                     id="description"
//                                     name="description"
//                                     value={editEventData.description}
//                                     onChange={handleChange}
//                                     required
//                                     className="form-control"
//                                   ></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                   <label htmlFor="date">Date:</label>
//                                   <input
//                                     type="date"
//                                     id="date"
//                                     name="date"
//                                     value={editEventData.date}
//                                     onChange={handleChange}
//                                     required
//                                     min={new Date().toISOString().split('T')[0]}
//                                     className="form-control"
//                                   />
//                                 </div>
//                                 <div className="form-group">
//                                   <label htmlFor="location">Location:</label>
//                                   <input
//                                     type="text"
//                                     id="location"
//                                     name="location"
//                                     value={editEventData.location}
//                                     onChange={handleChange}
//                                     required
//                                     className="form-control"
//                                   />
//                                 </div>
//                                 <div className="form-group">
//                                   <label htmlFor="category">Category:</label>
//                                   <select
//                                     id="category"
//                                     name="category"
//                                     value={editEventData.category}
//                                     onChange={handleChange}
//                                     required
//                                     className="form-control"
//                                   >
//                                     <option value="" disabled>Select Category</option>
//                                     <option value="anniversary">B'Day/Anniversary</option>
//                                     <option value="concert">Concert</option>
//                                     <option value="tech">Tech Seminar</option>
//                                     <option value="get_together">Small Get Together</option>
//                                     <option value="wedding">Wedding</option>
//                                     <option value="other">Other</option>
//                                   </select>
//                                 </div>
//                                 <div className="d-flex justify-content-between">
//                                   <button type="submit" className="btn btn-success">Save Changes</button>
//                                   <button type="button" className="btn btn-secondary" onClick={() => handleCancelEdit(event.id)}>Cancel</button>
//                                 </div>
//                               </form>
//                             ) : (
//                               <div className=''>
//                                 <div style={{ paddingLeft: '3px', fontSize: '20px' }}>
//                                   <h3 className="card-meta">{event.category}</h3>
//                                 </div>
//                                 <div className='d-flex justify-content-center'>
//                                   <img
//                                     src={event.imageUrl || categoryImages[event.category] || "/default.jpg"} // Use default image if category is not found
//                                     alt='EventImage'
//                                     width="575px"
//                                     height="300px"
//                                     style={{borderRadius:"10px", boxShadow:"1px 1px 6px grey"}}
//                                   />
//                                 </div>
//                                 <div style={{ paddingTop: '10px', paddingLeft: '3px', fontSize: '20px' }}>
//                                   <h3 style={{ fontSize: '18px', color: 'black', letterSpacing: '5px', fontWeight: 'light', paddingLeft: '3px' }} className='bona-nova-sc-bold'>{event.name}</h3>
//                                 </div>
//                                 <div style={{ paddingLeft: '7px' }}>
//                                   <small><i className="far fa-clock"></i> {event.date}</small>
//                                   <p className="mt-1" style={{ fontStyle: 'italic' }}>{event.description}</p>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                           <div className="card-footer d-flex justify-content-around" style={{ paddingTop: '0px' }}>
//                             {/* Registered for event button */}
//                             <button className="btn btn-secondary" style={{ backgroundColor: 'transparent', color: 'green' }}>Registered</button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           )}

//           {/* All Events Section */}
//           <div className="my-events-section">
//           <h2 className='bona-nova-sc-regular' style={{fontSize:'35px', letterSpacing:'3px', color:'gray', font:'lighter', textTransform: 'uppercase', paddingTop:'100px'}}>All Events</h2>
//             <div className="row">
//               {allEvents.length === 0 ? (
//                 <div className="col-12">
//                   <p>No Events to show</p>
//                 </div>
//               ) : (
//                 allEvents.map((event, index) => (
//                   <div key={index} className="col-sm-12 col-md-6 col-lg-6 mb-4 p-2">
//                     <div
//                       className="card text-dark card-has-bg click-col"
//                       style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')"}}
//                     >
//                       <div className="card-img-overlay d-flex flex-column pt-0">
//                         <div className="card-body">
//                           <div className=''>
//                             <div style={{paddingLeft:'3px', fontSize:'20px'}}>
//                               <h3 className="card-meta">{event.category}</h3>
//                             </div>
//                             <div className='d-flex justify-content-center' >
//                               <img
//                                 src={event.imageUrl || categoryImages[event.category] || "/default.jpg"} // Use default image if category is not found
//                                 alt='EventImage'
//                                 width="575px"
//                                 height="300px"
//                                 style={{borderRadius:"10px", boxShadow:"1px 1px 6px grey"}}
//                               />
//                             </div>
//                             <div style={{paddingTop:'10px' ,paddingLeft:'3px', fontSize:'20px' }}>
//                               <h3 style={{fontSize: '18px', color:'black', letterSpacing:'5px', fontWeight:'light', paddingLeft:'3px'}} className='bona-nova-sc-bold'>{event.name}</h3>
//                             </div>
//                             <div style={{paddingLeft:'7px'}}>
//                               <small><i className="far fa-clock"></i> {event.date}</small>
//                               <p className="mt-1" style={{fontStyle:'italic'}}>{event.description}</p>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="card-footer d-flex justify-content-center" style={{paddingTop:'0px'}}>
//                           {/* Register for event button */}
//                           <button onClick={() => handleRegister(event.id)} className="btn btn-secondary " style={{ backgroundColor: 'transparent', color: '#1F316F' }}>Register for Event</button>
//                           <ToastContainer />
//                           {/*Show Event Button*/}

//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Confirmation Modal */}
//       <ConfirmationModal
//           show={showConfirmationModal}
//           onHide={() => setShowConfirmationModal(false)}
//           onConfirm={() => {
//             handleEditEventClick(selectedEvent); // Call edit function
//             setShowConfirmationModal(false); // Hide modal
//           }}
//       />
//       <Modal showModal={showModal} setShowModal={setShowModal} userId={user.userId} />
//     </section></div>
//   );
// };
