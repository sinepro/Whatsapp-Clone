import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import './Chat.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AttachFile, InsertEmoticon, MicOutlined, SearchOutlined } from '@mui/icons-material';
import axios from './axios';

function Chat({ messages }) {
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: "Daniel",
            timestamp: new Date().toString(),
            received: false,
        });
    };

    return (
        <div className='chat'>
            {/* Header */}
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/* Body */}
            <div className="chat__body">
                {messages?.map((message) => (
                    <p className={`chat__message ${!message.received && 'chat__receiver'}`}>
                        <span className='chat__name'>
                            {message.name}
                        </span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            {/* Footer */}
            <div className="chat__footer">
                <InsertEmoticon />
                <form action="">
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder='Type a message' />
                    <button onClick={sendMessage} type='submit'>Send message</button>
                </form>
                <MicOutlined />
            </div>
        </div>
    )
}

export default Chat;
