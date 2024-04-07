import React, { useState, useEffect } from 'react';
// import {useEvents} from '../../hooks/useEvents';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"


const Events = () => {

  const { u, setU } = useContext(UserContext);
  const navigate = useNavigate();
  const first = u[0];
  const second = u[1];
  const third = u[2];
  const fourth = u[3];
  const [vetEmail, setVetEmail] = useState("");
  const [vetName, setVetName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!userEmail && !vetEmail) {
      if (first === "" && second === "") {
        setVetEmail(third);
        setVetName(fourth);
        setEmail(third);
        setUser(fourth);
      } else {
        setUserEmail(first);
        setUserName(second);
        setEmail(first);
        setUser(second);
      }
    }
  }, [first, second, third, fourth, userEmail, vetEmail]);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState('');

  const [events, setEvents] = useState([]);
  const [interestedEvents, setInterestedEvents] = useState([]);
  const [participatingEvents, setParticipatingEvents] = useState([]);
  useEffect(() => {
    // Fetch events from the database
    axios.get('http://localhost:5000/getAllEvents')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleInterest = (eventId) => {
    // Logic to handle indicating interest in the event
    // Send a request to update the interest count for the event
    axios.post(`http://localhost:5000/${eventId}/interest`)
      .then(response => {
        // Assuming the backend responds with updated event data
        setEvents(events.map(event => {
          if (event._id === eventId) {
            return response.data;
          }
          return event;
        }));
      })
      .catch(error => {
        console.error('Error indicating interest:', error);
      });
  };

  const handleNotInterested = (eventId) => {
    // Logic to handle indicating disinterest in the event
    // Send a request to update the disinterest count for the event
    axios.post(`http://localhost:5000/${eventId}/disinterest`)
      .then(response => {
        // Assuming the backend responds with updated event data
        setEvents(events.map(event => {
          if (event._id === eventId) {
            return response.data;
          }
          return event;
        }));
      })
      .catch(error => {
        console.error('Error indicating disinterest:', error);
      });
  };



  return (

    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-white text-2xl font-bold">Pet Connect</span>
          <div>     
            <button onClick={() => navigate("/home")} className="mr-5 text-white font-semibold hover:text-gray-300 transition duration-300 ease-in-out bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 text-sm">Home</button>
            <button onClick={() => navigate("/login")} className="text-white font-semibold hover:text-gray-300 transition duration-300 ease-in-out bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 text-sm">Log Out</button>
          </div>

        </div>
      </nav>


      <div className="container mx-auto mt-4 flex justify-center">
        <div className=" px-4 py-4 rounded-lg mt-8 bg-white min-h-0">
          {/* Filter options can go here */}
        </div>
        <div className="">
          {events.map(event => (
            <div key={event._id} className="bg-white rounded-lg border-2 border-red-500 shadow p-6 mb-4">

              <h2 className="font-bold text-2xl mb-2 text-center justify-center">{event.eventTitle}</h2>
              <div className="rounded bg-teal-500 text-black px-2 py-1 text-md flex items-center mb-2 justify-center">
                <span className="whitespace-no-wrap font-semibold">{event.dateAndTime}</span>
              </div>
              <div className="rounded bg-teal-500 text-black px-2 py-1 text-md flex items-center mb-2 justify-center">
                <p className="whitespace-no-wrap font-semibold">Created By: {event.creatorName}</p>
              </div>
              <p className="text-teal-900 font-bold text-lg mt-4 text-center"> Event Description: </p>
              <p className="text-gray-700 font-semibold text-md text-center">{event.description}</p>
              <div className="flex items-center justify-center mt-6">
                <div className="flex items-center mr-10">
                  <button onClick={() => handleInterest(event._id)} className="text-white rounded-full w-40 p-2 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-white bg-gray-500">
                    Interested ({event.interestCount})
                  </button>

                </div>
                <div className="flex items-center">
                  <button onClick={() => handleNotInterested(event._id)} className="text-white rounded-full w-40 p-2 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-white bg-gray-500">
                    Not Interested ({event.uninterestedCount})
                  </button>

                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="bg-white rounded-lg border-2 border-red-500 shadow p-6 mb-4 flex items-center justify-center">
              <p className="text-gray-700 font-bold">No events available</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );

};

export default Events;