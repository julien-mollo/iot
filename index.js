const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json()) // parses every posted JSON object and add to req.body
let messages = [];
let html = `<!DOCTYPE html>
<head>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
<h1> Received Messages </h1>
<div id="messages"></div>
<script>
$(document).ready(function(){
let messages_div = $( "#messages" );
let request = function(){
$.ajax({"http://127.0.0.1:3000/messages", type: "GET" })
.done(function( messages ) {
messages_div.empty();
for(let m of messages){
messages_div.prepend("<h3>" + m + "</h3>");
}
})
}
setInterval(request, 1000);
})
</script>
</body>
</html>`
app.get('/', function (req, res) { res.send(html) })
app.get('/messages', function(req, res) { res.json(messages); })
app.post('/', function (req, res) { messages.push( JSON.stringify(req.body)); })
app.listen(80, function() { console.log('App listening on port 3000') })