/*
 * app.js
 *
 * This is the main script for the FesTiPhus nameserver to run under node.
 */
 
/*
 * EXPRESS SERVER CONFIGURATION
 */

var express = require('express');

var app = module.exports = express.createServer();

//The list of users presently logged in
//Each element is an object with the following fields:
//  --name
//  --ip
//  --port
var users = [];

//Hello world:
app.get('/', function(req, res)
{
  res.send('SUP BRO');
});

//Register the address and port:
app.post('/reg/:username', function(req, res)
{
  
  //Get username, address, and port:
  var username = req.param('username');
  var ipAddress = req.client.remoteAddress;
  var port = req.client.remotePort;
  
  //Add user to list:
  users.push = 
  {
    name: username,
    ip: ipAddress,
    port: port
  };
  console.log(users);
  
  //Text response to user:
  res.send("<p>I got your address</p>" +
           "<p>Your username is: " + username + "</p>" +
           "<p>Your I.P. address is: " + ipAddress + "</p>" +
           "<p>The port you used is: " + port + "</p>");
});

/*
 * START THE SERVER
 */

app.listen(4000);
console.log('Express server listening on port %d in %s mode', 
    app.address().port, app.settings.env);
