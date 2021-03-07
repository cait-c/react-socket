const express = require('express');
const app = express();
const port = 8080
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.unsubscribe(cors());

app.get('/backend', (req,res) => {
    res.send({data: 'Express backend is connected to React!'})
});

app.post('/post_test', (req,res) => {
    console.log(req.body, 'body of request')
    if(req.status == 200){
        res.send('post test successful')
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));


// websocker server

const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('ws server connected')
    socket.emit('connection', 'hello client connection')
    socket.on('hello world', (arg, arg2) => {
        console.log(arg)
        console.log(arg2)
        socket.emit('responding to hello world')
    })
});

io.on('connection_error', (err) => {
    console.log(`connection error due to ${err.message}`)
});

httpServer.listen(3001)