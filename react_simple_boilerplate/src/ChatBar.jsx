import React from 'react';

class ChatBar extends React.Component{
  render(){
    return(
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress = {this.props.userUpdate} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" onKeyPress= {this.props.keyPress} placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;


