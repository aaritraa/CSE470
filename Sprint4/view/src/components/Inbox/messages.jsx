import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from "../../App.jsx"


const Messages = () => {
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


  //console.log("here >> ", thirdElement)

  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [senders, setSenders] = useState([]);
  const [selectedSender, setSelectedSender] = useState(null);
  const [messages, setMessages] = useState([]);




  useEffect(() => {
    setEmail(userEmail ? userEmail : vetEmail);
  }, [userEmail, vetEmail]);


  useEffect(() => {
    const fetchSenders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getSenders/${email}`);
        if (response.data.length !== 0) {
          setSenders(response.data);
          console.log(response.data);
          console.log("Current User: ", email)
        }
      } catch (error) {
        console.error('Error fetching senders:', error);
      }
    };

    fetchSenders();
  }, [email]);


  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedSender) {
        try {
          const response = await axios.get(`http://localhost:5000/getMessages/${email}/${selectedSender.fromEmail}`);
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [selectedSender, email]);

  const sendMessage = () => {
    const fromEmail = userEmail ? userEmail : vetEmail;
    const fromName = userName ? userName : vetName;
    const data = {
      fromEmail: fromEmail,
      fromName: fromName,
      toEmail: recipientEmail,
      toName: recipientName,
      content: messageContent
    };

    const newMessage = {
      fromEmail: fromEmail,
      fromName: fromName,
      toEmail: recipientEmail,
      toName: recipientName,
      content: messageContent,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);

    axios.post('http://localhost:5000/sendMessage', data)
      .then(response => {
        console.log('Message sent successfully');

      })
      .catch(error => {
        console.error('Error sending message:', error);

      });
  };

  const sendMessageNow = () => {
    const fromEmail = userEmail ? userEmail : vetEmail;
    const recipientEmail = selectedSender.fromEmail;
    const recipientName = selectedSender.fromName;
    const fromName = userName ? userName : vetName;
    const currentTime = new Date().toISOString();

    const data = {
      fromEmail: fromEmail,
      fromName: fromName,
      toEmail: recipientEmail,
      toName: recipientName,
      content: messageContent,
      timestamp: currentTime
    };
    console.log("hi", selectedSender);

    const newMessage = {
      fromEmail: fromEmail,
      fromName: fromName,
      toEmail: recipientEmail,
      toName: recipientName,
      content: messageContent,
      timestamp: currentTime
    };
    setMessages([...messages, newMessage]);

    axios.post('http://localhost:5000/sendMessage', data)
      .then(response => {
        console.log('Message sent successfully');

      })
      .catch(error => {
        console.error('Error sending message:', error);

      });
  };

  const handleViewConversation = (sender) => {
    setSelectedSender(sender);
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

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', background: '#f5f5f5', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center', fontWeight: 'bold' }}>Send Message</h1>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Set your name:</label>
          <input type="text" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} value={senderName} onChange={(e) => setSenderName(e.target.value)} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Recipient's Email:</label>
          <input type="email" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} value={recipientEmail} onChange={(e) => {
            setRecipientEmail(e.target.value);
            //setRecipientName(e.target.value.split('@')[0]); 
          }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Recipient's Name:</label>
          <input type="text" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Enter Message:</label>
          <textarea style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }} value={messageContent} onChange={(e) => setMessageContent(e.target.value)}></textarea>
        </div>
        <button style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s ease', marginBottom: '20px' }} onClick={sendMessage}>Send</button>

        <div>
          <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center', fontWeight: 'bold' }}>Inbox</h2>
          {senders.map((sender, index) => (
            <div key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
              <span>{sender["_id"].fromName}</span>
              <button style={{ background: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', fontSize: '14px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s ease' }} onClick={() => handleViewConversation(sender["_id"])}>View Conversation</button>
            </div>
          ))}
        </div>

        {selectedSender && (
          <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
            <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center', fontWeight: 'bold' }}> {selectedSender.fromName}</h2>
            {messages
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map((message, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', flexDirection: message.fromEmail === selectedSender.fromEmail ? 'row' : 'row-reverse' }}>
                  <div style={{ maxWidth: '70%', padding: '10px', background: message.fromEmail === selectedSender.fromEmail ? '#f0f0f0' : '#007bff', color: message.fromEmail === selectedSender.fromEmail ? '#333' : '#fff', borderRadius: '8px', borderBottomLeftRadius: message.fromEmail === selectedSender.fromEmail ? '0' : '8px', borderBottomRightRadius: message.fromEmail === selectedSender.fromEmail ? '8px' : '0' }}>
                    <p style={{ margin: '0', fontWeight: 'bold' }}>{message.fromName}</p>
                    <p style={{ margin: '0' }}>{message.content}</p>
                  </div>
                </div>
              ))}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <input type="text" style={{ flex: '1', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }} placeholder="Type your message..." value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
              <button style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s ease' }} onClick={sendMessageNow}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
