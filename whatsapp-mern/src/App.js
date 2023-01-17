import { useEffect, useState } from 'react';
import './App.scss'
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
import { pusherID } from '../public/secrets';


function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data);
      })
  }, []);

  useEffect(() => {
    var pusher = new Pusher(pusherID, {
      cluster: 'eu',
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      /* alert(JSON.stringify(newMessage)); */
      setMessages([...messages, newMessage]);
    });

    // Clean up => does subscribe every time useEffect is triggered, so we clean it
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
