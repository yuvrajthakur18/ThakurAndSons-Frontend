import React, { useState, useEffect } from 'react';
import './Card.css';
import { Modal } from './Modal';
import { events as dummyEvents } from '../events';

export const Card = () => {
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [myCreatedEvents, setMyCreatedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [user, setUser] = useState({ username: '', email: '', userId: '' });
  const [isHomepage, setIsHomepage] = useState(false);

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

  useEffect(() => {
    if (user.id) {
      fetchUserEvents(user.id);
      localStorage.setItem('userId', user.id);
    }
  }, [user.id]);

  const fetchUserInfo = async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/user/${username}`);
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
      const response = await fetch('http://localhost:8080/api/events/all');
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

  const fetchUserEvents = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/events/user/${userId}`);
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

  const handleAddEventClick = () => {
    setShowModal(true);
  };

  const handleRegister = async (eventId) => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID
  
    try {
      const response = await fetch('http://localhost:8080/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          eventId
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Successfully registered for the event!');
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Failed to register for the event.');
    }
  };

  

  return (
    <section className="wrapper">
      <div className="container">
        {/* User Info Header */}
        <div className="text-center mb-4">
          <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#ff0000', textTransform: 'uppercase' }}>
            {username || 'Home Page 🏠'}
          </h3>
        </div>

        <div className="row">
          {/* Conditionally render Add New Event Button */}
          {!isHomepage && (
            <div className="col-12 mb-4">
              <button
                className="btn btn-primary"
                style={{ backgroundColor: '#50a7c2', color: '#ffffff' }}
                onClick={handleAddEventClick}
              >
                Add New Event
              </button>
            </div>
          )}

          {/* Conditionally render My Events Section */}
          {!isHomepage && (
            <div className="my-events-section">
              <h2 style={{fontSize: '1.3rem', color: '#ff0000', textTransform: 'uppercase'}}>{username}'s Events</h2>
              <div className="row">
                {myCreatedEvents.length === 0 ? (
                  <div className="col-12">
                    <p>No Events to show</p>
                  </div>
                ) : (
                  myCreatedEvents.map((event, index) => (
                    <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4 p-2">
                      <div
                        className="card text-light card-has-bg click-col"
                        style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
                      >
                        <img
                          className="card-img d-none"
                          src={"https://source.unsplash.com/600x900/?" + event.category + ",street"}
                          alt={event.name}
                        />
                        <div className="card-img-overlay d-flex flex-column">
                          <div className="card-body">
                            <small className="card-meta mb-2">{event.category}</small>
                            <h4 className="card-title mt-0">
                              <a className="text-light" href="#!">{event.name}</a>
                            </h4>
                            <small><i className="far fa-clock"></i> {event.date}</small>
                            <p className="mt-3">{event.description}</p>
                          </div>
                          <div className="card-footer">
                            <div className="media">
                              <div className="media-body">
                                <h6 className="my-0 text-light d-block" style={{ textTransform: 'uppercase' }}>{username}</h6>
                              </div>
                            </div>
                            <button className="btn btn-secondary mt-2" style={{ backgroundColor: '#30e5ca', color: '#ffffff' }}>Registered</button>
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
            <h2>All Events</h2>
            <div className="row">
              {allEvents.length === 0 ? (
                <div className="col-12">
                  <p>No Events to show</p>
                </div>
              ) : (
                allEvents.map((event, index) => (
                  <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4 p-2">
                    <div
                      className="card text-light card-has-bg click-col"
                      style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
                    >
                      <img
                        className="card-img d-none"
                        src={"https://source.unsplash.com/600x900/?" + event.category + ",street"}
                        alt={event.name}
                      />
                      <div className="card-img-overlay d-flex flex-column">
                        <div className="card-body">
                          <small className="card-meta mb-2">{event.category}</small>
                          <h4 className="card-title mt-0">
                            <a className="text-light" href="#!">{event.name}</a>
                          </h4>
                          <small><i className="far fa-clock"></i> {event.date}</small>
                          <p className="mt-3">{event.description}</p>
                        </div>
                        <div className="card-footer">
                          <div className="media">
                            <div className="media-body">
                              <h6 className="my-0 text-light d-block">Event</h6>
                            </div>
                          </div>
                          <button onClick={() => handleRegister(event.id)} className="btn btn-secondary mt-2" style={{ backgroundColor: '#84ceda', color: '#ffffff' }}>Register for Event</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Existing Dummy Events Section */}
          <div className="my-events-section">
            <h2>Dummy Events</h2>
            <div className="row">
              {dummyEvents.map((event, index) => (
                <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4 p-2">
                  <div
                    className="card text-light card-has-bg click-col"
                    style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
                  >
                    <img
                      className="card-img d-none"
                      src={"https://source.unsplash.com/600x900/?" + event.category + ",street"}
                      alt={event.name}
                    />
                    <div className="card-img-overlay d-flex flex-column">
                      <div className="card-body">
                        <small className="card-meta mb-2">{event.category}</small>
                        <h4 className="card-title mt-0">
                          <a className="text-light" href="#!">{event.name}</a>
                        </h4>
                        <small><i className="far fa-clock"></i> {event.date}</small>
                        <p className="mt-3">{event.description}</p>
                      </div>
                      <div className="card-footer">
                        <div className="media">
                          <div className="media-body">
                            <h6 className="my-0 text-light d-block">Event</h6>
                          </div>
                        </div>
                        <button className="btn btn-secondary mt-2" style={{ backgroundColor: '#84ceda', color: '#ffffff' }}>Register for Event</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} userId={user.userId} />
    </section>
  );
};


// import React, { useState, useEffect } from 'react';
// import './Card.css';
// import { Modal } from './Modal';
// import { events as dummyEvents } from '../events';

// export const Card = () => {
//   const [username, setUsername] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [myCreatedEvents, setMyCreatedEvents] = useState([]);
//   const [myRegisteredEvents, setMyRegisteredEvents] = useState([]);
//   const [allEvents, setAllEvents] = useState([]);
//   const [user, setUser] = useState({ username: '', email: '', userId: '' });

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setUsername(storedUsername);
//       fetchUserInfo(storedUsername);
//     }
//     fetchAllEvents();
//   }, []);

//   useEffect(() => {
//     if (user.id) {
//       fetchUserEvents(user.id);

//       localStorage.setItem('userId', user.id);
//     }
//   }, [user.id]);

//   const fetchUserInfo = async (username) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/auth/user/${username}`);
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
//       const response = await fetch('http://localhost:8080/api/events/all');
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

//   const fetchUserEvents = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/events/user/${userId}`);
//       if (response.ok) {
//         const createdEvents = await response.json();
//         console.log('Hello ',createdEvents); // For debug purpose
//         setMyCreatedEvents(createdEvents);
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

//   return (
//     <section className="wrapper">
//       <div className="container">
//         {/* User Info Header */}
//         <div className="text-center mb-4">
//           <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#ff0000', textTransform: 'uppercase' }}>
//             {username || 'Home Page 🏠'}
//           </h3>
//         </div>

//         <div className="row">
//           {/* Add New Event Button */}
//           <div className="col-12 mb-4">
//             <button
//               className="btn btn-primary"
//               style={{ backgroundColor: '#50a7c2', color: '#ffffff' }}
//               onClick={handleAddEventClick}
//             >
//               Add New Event
//             </button>
//           </div>

//           {/* My Created Events Section */}
//           <div className="my-events-section">
//             <h2>My Created Events</h2>
//             <div className="row">
//               {myCreatedEvents.length === 0 ? (
//                 <div className="col-12">
//                   <p>No Events to show</p>
//                 </div>
//               ) : (
//                 myCreatedEvents.map((event, index) => (
//                   <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4 p-2">
//                     <div
//                       className="card text-light card-has-bg click-col"
//                       style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
//                     >
//                       <img
//                         className="card-img d-none"
//                         src={"https://source.unsplash.com/600x900/?" + event.category + ",street"}
//                         alt={event.name}
//                       />
//                       <div className="card-img-overlay d-flex flex-column">
//                         <div className="card-body">
//                           <small className="card-meta mb-2">{event.category}</small>
//                           <h4 className="card-title mt-0">
//                             <a className="text-light" href="#!">{event.name}</a>
//                           </h4>
//                           <small><i className="far fa-clock"></i> {event.date}</small>
//                           <p className="mt-3">{event.description}</p>
//                         </div>
//                         <div className="card-footer">
//                           <div className="media">
//                             <div className="media-body">
//                               <h6 className="my-0 text-light d-block">Created by {username}</h6>
//                             </div>
//                           </div>
//                           <button className="btn btn-secondary mt-2" style={{ backgroundColor: '#30e5ca', color: '#ffffff' }}>Registered</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* My Registered Events Section */}
//           <div className="my-events-section">
//             <h2>My Registered Events</h2>
//             <div className="row">
//               {myRegisteredEvents.length === 0 ? (
//                 <div className="col-12">
//                   <p>No Events to show</p>
//                 </div>
//               ) : (
//                 myRegisteredEvents.map((event, index) => (
//                   <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4 p-2">
//                     <div
//                       className="card text-light card-has-bg click-col"
//                       style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
//                     >
//                       <img
//                         className="card-img d-none"
//                         src={"https://source.unsplash.com/600x900/?" + event.category + ",street"}
//                         alt={event.name}
//                       />
//                       <div className="card-img-overlay d-flex flex-column">
//                         <div className="card-body">
//                           <small className="card-meta mb-2">{event.category}</small>
//                           <h4 className="card-title mt-0">
//                             <a className="text-light" href="#!">{event.name}</a>
//                           </h4>
//                           <small><i className="far fa-clock"></i> {event.date}</small>
//                           <p className="mt-3">{event.description}</p>
//                         </div>
//                         <div className="card-footer">
//                           <div className="media">
//                             <div className="media-body">
//                               <h6 className="my-0 text-light d-block">Event</h6>
//                             </div>
//                           </div>
//                           <button className="btn btn-secondary mt-2" style={{ backgroundColor: '#84ceda', color: '#ffffff' }}>Register for Event</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* All Events Section */}
//           <div className="my-events-section">
//             <h2>All Events</h2>
//             <div className="row">
//               {allEvents.length === 0 ? (
//                 <div className="col-12">
//                   <p>No Events to show</p>
//                 </div>
//               ) : (
//                 allEvents.map((event, index) => (
//                   <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4 p-2">
//                     <div
//                       className="card text-light card-has-bg click-col"
//                       style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
//                     >
//                       <img
//                         className="card-img d-none"
//                         src={"https://source.unsplash.com/600x900/?" + event.category + ",street"}
//                         alt={event.name}
//                       />
//                       <div className="card-img-overlay d-flex flex-column">
//                         <div className="card-body">
//                           <small className="card-meta mb-2">{event.category}</small>
//                           <h4 className="card-title mt-0">
//                             <a className="text-light" href="#!">{event.name}</a>
//                           </h4>
//                           <small><i className="far fa-clock"></i> {event.date}</small>
//                           <p className="mt-3">{event.description}</p>
//                         </div>
//                         <div className="card-footer">
//                           <div className="media">
//                             <div className="media-body">
//                               <h6 className="my-0 text-light d-block">Event</h6>
//                             </div>
//                           </div>
//                           <button className="btn btn-secondary mt-2" style={{ backgroundColor: '#84ceda', color: '#ffffff' }}>Register for Event</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Existing Dummy Events Section */}
//           <div className="my-events-section">
//             <h2>Dummy Events</h2>
//             <div className="row">
//               {dummyEvents.map((event, index) => (
//                 <div key={index} className="col-sm-12 col-md-6 col-lg-4 mb-4 p-2">
//                   <div
//                     className="card text-light card-has-bg click-col"
//                     style={{ backgroundImage: "url('https://source.unsplash.com/600x900/?" + event.category + ",street')" }}
//                   >
//                     <img
//                       className="card-img d-none"
//                       src={"https://source.unsplash.com/600x900/?" + event.category + ",street"}
//                       alt={event.name}
//                     />
//                     <div className="card-img-overlay d-flex flex-column">
//                       <div className="card-body">
//                         <small className="card-meta mb-2">{event.category}</small>
//                         <h4 className="card-title mt-0">
//                           <a className="text-light" href="#!">{event.name}</a>
//                         </h4>
//                         <small><i className="far fa-clock"></i> {event.date}</small>
//                         <p className="mt-3">{event.description}</p>
//                       </div>
//                       <div className="card-footer">
//                         <div className="media">
//                           <div className="media-body">
//                             <h6 className="my-0 text-light d-block">Event</h6>
//                           </div>
//                         </div>
//                         <button className="btn btn-secondary mt-2" style={{ backgroundColor: '#84ceda', color: '#ffffff' }}>Register for Event</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>


//         </div>
//       </div>
//       <Modal showModal={showModal} setShowModal={setShowModal} userId={user.userId} />
//     </section>
//   );
// };
