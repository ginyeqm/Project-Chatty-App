import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

  render(){
    return(
      <main className="messages">
        {this.props.messages.map((message, index) => (
          <Message key={index} messageN = {message}/>
        ))}
      </main>
    )
  }
}

export default MessageList;





