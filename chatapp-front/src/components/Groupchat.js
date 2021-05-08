import Message from './Message'
import React from 'react'
import SendMessage from './SendMessage'
import User from './User'
import './style.css'


class Groupchat extends React.Component {
  constructor(props) {
    super(props)  
    this.state = {
      wsocket: null,
      messages: [
        {
          id: '',
          content:'',
        },
      ],
      users: [
        {
          id: '',
          name: ''
        }
      ],
      newMessage: '',
      newUser: '',
    }
    
  }

  

  componentDidMount(){
    this.connect()
  }

  timeout = 250;

  connect = () => {
    var wsocket = new WebSocket('ws://localhost:8080/chat')
    let that = this;
    var connectInterval;

    
    wsocket.onmessage = m =>{
    var message = JSON.parse(m.data) 

      if(message.includes("new user:")){
        this.setState({newUser: message.substring(9)})
        this.addUser()
        console.log("user registered")
      }
      if(message.includes("exit")){
        var message2 = message.substring(5)
        this.setState({users: this.state.users.filter(user => (
          user.name !== message2
        ))})
        console.log("käyttäjä poistettu")
      }
      else{
        console.log("new message")
      this.setState({newMessage: message})
      
      const mObj = {
        id: Math.floor(Math.random()*100000),
        content: this.state.newMessage
      }
  
      const messageObj = this.state.messages.concat(mObj)

      if(messageObj.length > 10){
        messageObj.shift()
      }
  
      this.setState({
        messages: messageObj,
        newMessage: ''
      })
    }}
    wsocket.onclose = () =>{
      that.timeout = that.timeout + that.timeout
      connectInterval = setTimeout(this.check, Math.min(6000, that.timeout))
      console.log("connection closed")
    }

    wsocket.onopen = () => {
      console.log('connected')
      this.setState({wsocket: wsocket,
      username: this.props.location.state.username})
      this.state.wsocket.send(JSON.stringify("new user:" + this.state.username))
      that.timeout=250;
      clearTimeout(connectInterval)    
    }
    
  }

  componentWillUnmount() {
    this.state.wsocket.close()
  }


  check = () => {
    const {wsocket} = this.state
    if (!wsocket || wsocket.CLOSED || wsocket.CLOSING){
      this.connect()
  }}

  addUser = () =>{
    const uObj = {
      id: Math.floor(Math.random()*10000),
      name: this.state.newUser
    }

    const userObjects = this.state.users.concat(uObj)

    this.setState({
      users: userObjects,
      newUser: ''
    })

    console.log(this.state.users)
  }

  addMessage = (event) => {
    event.preventDefault()
    const mObj = {
      id: Math.floor(Math.random()*10000),
      content: this.state.newMessage
    }

    const messageObj = this.state.messages.concat(mObj)

    if(messageObj.length > 10){
      messageObj.shift()
    }

    this.state.wsocket.send(JSON.stringify(this.props.location.state.username + ": " + this.state.newMessage))

    this.setState({
      messages: messageObj,
      newMessage: ''
    })
    event.target.reset()
  }



  handleChange = (event) =>{
    console.log(event.target.value)
    this.setState({newMessage: event.target.value})
  }


  render() {
    return (
      <div className="groupchat">
        <div className="chat-header">Welcome to the chat</div>
        <div className="main">
        <ul>
          {this.state.messages.map(message => <Message key={message.id} 
          message={message} />)}
        </ul>
        </div>
        <div className='footer'>
        <form className="chat-form" onSubmit={this.addMessage}>
          <SendMessage 
                  user = {this.props.location.state.username}
                  text = "says: "
                  value = {this.state.newMessage}
                  handleChange = {this.handleChange}/>
          <button className="chat-button" type="submit">send</button>
        </form>
        </div>
        <div className='left'>
        <p> Currently chatting with you:</p>
        <ul>
          {this.state.users.map(user => <User key = {user.id}
          user = {user.name} />)}
        </ul>
        </div>
      </div>
    )
  }}

export default Groupchat