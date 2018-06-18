import React from 'react'

class Message extends React.Component {
  render(){
    {if(this.props.messageN.type === 'message'){
      return (
        <div className="message">
          <span className="message-username">{this.props.messageN.username}</span>
          <span className="message-content">{this.props.messageN.content}</span>
        </div>
      )
    } else {
      return (
        <div className="message system" >
            {this.props.messageN.content}
        </div>
      )
    }}
  }
}

export default Message;