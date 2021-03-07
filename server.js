const express = require('express');
const app = express();
const port = 8080
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.unsubscribe(cors());

app.get('/backend', (req,res) => {
    res.send({data: 'Express backend is connected to React!'})
})

app.post('/post_test', (req,res) => {
    console.log(req.body, 'body of request')
    if(req.status == 200){
        res.send('post test successful')
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`))