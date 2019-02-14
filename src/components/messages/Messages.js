import React, { Component } from 'react'
import "./Messages.css"
import MessageBubbles from "./MessageBubbles"
export default class Messages extends Component {

    state = {
        message: "",
        timeDisplay: "",
        timestamp: "",
        userId: Number(sessionStorage.getItem("username"))
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        const {chatBox} = this.refs;
        chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
    }

    createNewMessage = event => {
        event.preventDefault();     
        event.target.reset();      

        let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        let d = new Date();
        let month = d.getMonth();
        let date = d.getDate();
        let year = d.getFullYear();
        let hours = d.getHours();
        let minutes = ("0" + d.getMinutes()).slice(-2);
        let suffix = "AM";
    if (hours > 12) {
        suffix = "PM";
        hours = hours - 12;
        }
        else if (hours === 12) {
        suffix = "PM";
        }
        let dateDisplay = hours + ":" + minutes + " " + suffix + " " + months[month] + "/" + date + "/" + year ;

        let timestamp = d.getTime();

        const newMessageObj = {
            message: this.state.message,
            timestamp: timestamp,
            timeDisplay: dateDisplay,
            userId: this.state.userId
        }

        this.props.postNewMessage(newMessageObj);

        this.scrollToBottom();     
    }
    findFriends = () => {
        this.props.friends.map(friend => {
            console.log(friend)
        })
    }
    


    render() {
        return (
        <>
        <div className="banner">
        <h1>Message</h1>
        </div>
            <section className="chatroom">
                
                <div className="chat_box" ref={`chatBox`}>
                {
                    this.props.messages.map(message =>
                        <MessageBubbles key={message.id} message={message} {...this.props} />
                    )
                }
                </div>
                <form id="chatMessageForm" className="d-flex justify-content-between" onSubmit={this.createNewMessage}>
                    <div className="message_input">
                        <input type="text" required
                            placeholder="Enter your message here"
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="message" />
                    </div>
                    <div className="message_btn">
                        <button type="submit" onClick={this.findFriends} className="btn btn-primary buttons">Submit</button>
                    </div>
                </form>
            </section>
            </>
        )
    }
}