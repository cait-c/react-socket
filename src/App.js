import React, {Component} from 'react';
import './App.css';
import {io} from 'socket.io-client'; 


class App extends Component{

  state = {
    data: null
  }
  
  socket = io('ws//localhost:3001',
    {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      transport: ['websocket'],
      withCredentials: true
  })

  componentDidMount() {
    this.callBackend()
      .then(res => this.setState({data: res.data}))
      .catch(err => console.log(err))

    this.socket.io('connection', (arg) => {
      console.log(arg) // hello client connection
    })

    this.socket.on('hello world response', () => {
      console.log('hello world to you too')
    })

    this.socket.on('body send', (body) => {
      console.log(body) // body from request that hit post endpoint
    })

  }

  socketSend = () => {
    this.socket.emit('hello world', 'hello world arg', 'hello world arg2')
  }

  callBackend = () => {
    const response = await fetch('/backend');
    const body = await response.json();

    if(response.state !== 200){
      throw Error(body.message)
    }
    return body
  }

  render() {
      return (
    <div className="App">
      <h1>Socket.io React App</h1>

      <p>{this.state.data}</p>
      <button onClick={this.socketSend}>Emit hello World to Socket Connection</button>
    </div>
  );
  }

}

export default App;
