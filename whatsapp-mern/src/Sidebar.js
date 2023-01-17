import React from 'react';
import './Sidebar.scss';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className='sidebar'>
            {/* Header */}
            <div className="sidebar__header">
                <div className="sidebar__headerLeft">
                    <Avatar /> {/* src='xyz' - adds source for the avatar picture */}
                </div>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/* Search */}
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder='Search or start a new chat' />
                </div>
            </div>

            {/* Chats */}
            <div className="sidebar__chats">
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar;
