import React, { Component } from 'react'
import "./Messages.css"
import MessageManager from '../../modules/MessageManager';

export default class MessageBubbles extends Component {

    // Set initial state
    state = {
        message: "",
        timeDisplay: "",
        timestamp: "",
        userId: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        // console.log(evt.target.id, evt.target.value);
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // When "edit" link is clicked, set state for current ChatCard
    editLink = () => {
        MessageManager.get(this.props.message.id)
        .then(message => {
            this.setState({
                message: message.message,
                timeDisplay: message.timeDisplay,
                timestamp: message.timestamp,
                userId: message.userId
            })
        })
    }

    // This is called inside render.
    // If 'message' in state is not empty, show edit field.
    // Otherwise, show the static message text.
    returnFormOrText = (message) => {
        let currentUser = sessionStorage.getItem("username");
        if (this.state.message !== "" && this.state.userId === Number(currentUser)) {
            return (
                <div className="message_text">
                    <form className="chatEditForm" onSubmit={this.updateExistingMessage} onMouseLeave={this.updateExistingMessage}>
                        <input type="text" required
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="message"
                        value={this.state.message} />
                    </form>
                </div>
            )
        } else {
            return (
                <div className="message_text" onClick={this.editLink}>{message}</div>
            )
        }
    }

    // Sets the "bubble" style for current user vs other users
    userConditionalStyle = (userId) => {
        let sessionUser = sessionStorage.getItem("username");
        if (this.props.message.userId === Number(sessionUser)) {
            let style = "current_user";
            return style;
        }
        else {
            let style = "other_user"
            return style;
        }
    }

    // Edit existing message upon submission.
    updateExistingMessage = evt => {
        evt.preventDefault();

        const existingMessage = {
            message: this.state.message,
            timeDisplay: this.state.timeDisplay,
            timestamp: this.state.timestamp,
            userId: this.state.userId
        }

        this.props.editMessage(this.props.message.id, existingMessage)
        .then(() => {
            // Resets 'message' in state to empty so that static message text displays.
            this.setState({ message: "" })
        })
    }


    render() {
        return (
                <div key={this.props.message.id} className={this.userConditionalStyle(this.props.message.userId)}>
                    <div className="message_box">
                        <span className="username">{this.props.message.user.name}</span>

                        {this.returnFormOrText(this.props.message.message)}
                        {/* {this.userConditionalEdit(this.props.message.userId)} */}
                        <div className="bottom_info">{this.props.message.timeDisplay}</div>

                    </div>
                </div>

        )
    }
}