import React from 'react';
import CommentList from '../molecules/comment-list.jsx';
import CommentForm from '../molecules/comment-form.jsx';
import PeopleList from '../molecules/people-list.jsx';

class Chat extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            comments: [],
            people: []
        };
        this.setState = this.setState.bind(this);
        var sockjs_url = '/chat';
        this.sockjs = new SockJS(sockjs_url);
        this.sockjs.onopen = this._initialize.bind(this);
        this.sockjs.onmessage = this._onMessage.bind(this);
        this.sockjs.onclose = this._onClose.bind(this);
    };

    _initialize() {
        console.log("connected");
        this._sendMessage({text: 'Connected. Type /help for a list of available commands.', type: 'private', id: 'connected'});
    }

    _onMessage(e) {
        this._sendMessage(JSON.parse(e.data));
    }

    _onClose() {
        this._sendMessage({text:'Closing Connection.', type: 'private', id: 'disconnected'});
    }

    _sendMessage(message) {
        if (message.type == 'history_list') {
            message.data.forEach(function(m){
                this.state.comments.push(m);
                this.setState(this.state);
            }.bind(this))
        } else if (message.type == 'user_list') {
            Object.keys(message.data).map(function (key) {return message.data[key]}).forEach(function(m){
                this.state.people.push(m);
                this.setState(this.state);
            }.bind(this))
        } else {
            this.state.comments.push(message);
            this.setState(this.state)

            if (message.type == 'joined_channel') {
                this.state.people.push(message.data);
                this.setState(this.state);
            } else if (message.type == 'left_channel') {
                this.state.people.splice(
                    this.state.people.findIndex(
                        (i) => i.username === message.username
                    ),1
                );
                this.setState(this.state);
            } else if (message.type == 'username_changed') {
                console.log(message)
                this.state.people.forEach(function(user) {
                    if (user.connection_id == message.data.connection_id) {
                        user.username = message.data.username;
                    }
                })
                this.setState(this.state);
            }
        }
    }

    handleMessageSubmit(message) {
        this.sockjs.send(JSON.stringify({type: "text_message", text: message}));
    }

    render () {
        return (
            <div id="first" className="box">
                <div className="commentsContainer">
                    <CommentList comments={this.state.comments}/>
                    <CommentForm onMessageSubmit={this.handleMessageSubmit.bind(this)}/>
                </div>
                <PeopleList people={this.state.people}/>
        </div>
    )
};
}

export default Chat;
