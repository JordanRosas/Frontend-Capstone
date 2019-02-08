import React, { Component } from 'react'
import MessageBubbles from './MessageBubbles'
export default class Messages extends Component{

  state={
    message:"",
    timeStamp:"",
    timeDisplay:"",
    userId:Number(sessionStorage.getItem("username"))
  }

  handleFieldChange = evt => {
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  createNewMessage = evt => {
    evt.preventDefault()

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
    let dateDisplay = months[month] + "/" + date + "/" + year + " at " + hours + ":" + minutes + " " + suffix;

    let timestamp = d.getTime();

    const newMessage = {
      message:this.state.message,
      timeDisplay:dateDisplay,
      timeStamp:timestamp,
      userId:Number(sessionStorage.getItem("username"))
    }
    this.props.postNewMessage(newMessage)
    .then(() => this.props.history.push("/messages"))
  }
  render(){
    return(
      <section className="chatroom">
        <h1>Messages</h1>
          <div className="chat_box" ref={`Messages`}>
          {
          this.props.messages.map(message =>
            console.log(message)
              // <MessageBubbles key={message.id} message={message} {...this.props} />
          )
        }
      </div>
      <form id="chatMessageForm" className="d-flex justify-content-between" onSubmit={this.addNewMessage}>
          <div className="message_input">
              <input type="text" required
                  placeholder="Enter your message here"
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="message" />
          </div>
          <div className="message_btn">
              <button type="button" onClick={this.createNewMessage} className="btn btn-primary">Submit</button>
          </div>
      </form>
  </section>
    )
  }
}