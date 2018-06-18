import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      count: 0
    }
  }

  componentDidMount(){
    console.log("componentDidMount <App />")
    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    }

    this.socket.onmessage = (event) => {
      const clientMsg = JSON.parse(event.data);
      this.setState((prevState) => {
        if(clientMsg.type === 'count'){
          return {count: clientMsg.count};
        } else {
          return {messages: [...prevState.messages, clientMsg]};
        }
      });
    }
  };


keyPress = (event) => {
  if(event.key === 'Enter'){
    var value = event.target.value;
    var sendMsgToServer = JSON.stringify({type: 'message', username: this.state.currentUser.name, content:value});
    this.socket.send(sendMsgToServer);
    event.target.value = "";
  }
}

userUpdate = (event) => {
  if(event.key === 'Enter'){
    var userName = event.target.value;

    this.socket.send(JSON.stringify({type: 'notification', content: `${this.state.currentUser.name} is changed to ${userName}`}));

    this.setState((prevState)=> (
      {currentUser: {name:userName}}
    ));
  }
}

  render() {


    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="user-online"> {`${this.state.count} users online`}</p>
        </nav>
        <MessageList keyPress = {this.keyPress} userUpdate = {this.userUpdate} messages = {this.state.messages} />
        <ChatBar userUpdate = {this.userUpdate} keyPress ={this.keyPress} currUser = {this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;
