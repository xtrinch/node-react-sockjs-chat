import React from 'react';
import Chat from './organisms/chat.jsx';
import SockJS from 'sockjs-client';

class App extends React.Component {

    render () {
        return (
            <Chat/>
        )
    }
}

export default App
