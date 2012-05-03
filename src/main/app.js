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
app.post('/reg/:username/:port', function(req, res)
{
  
  //Get username, address, and port:
  var username = req.param('username');
  console.log(username);
  var ipAddress = req.client.remoteAddress;
  //var port = req.client.remotePort;
  var port = req.param('port');
  
  //Add user to list:
  
  //Search through the list of users and see whether the requested
  //name is in use. If so, break out of the loop and set
  //usernameIsAvailable to false.
  var usernameIsAvailable = true;
  for (var i = 0; i < users.length; i++)
  {
    if (users[i].name === username)
    {
        usernameIsAvailable = false;
        break;
    }
  }
  
  if (usernameIsAvailable)
  {
    users.push(
    {
      name: username,
      ip: ipAddress,
      port: port
    });
    
    //Text response to user:
    res.send("<p>I got your address</p>" +
             "<p>Your username is: " + username + "</p>" +
             "<p>Your I.P. address is: " + ipAddress + "</p>" +
             "<p>The port you used is: " + port + "</p>");
    
    console.log(users);
  }
  else
  {
    res.send("Sorry, that username is unavailable.");
  }
});

//Return whether a requested user is logged in: 
app.get('/reg/:username', function(req, res)
{
  var username = req.param('username');
  var usernameIsAvailable = true;
  
  //Search through the list of users and see whether the requested
  //name is in use. If so, break out of the loop and set
  //usernameIsAvailable to false.
  for (var i = 0; i < users.length; i++)
  {
    if (users[i].name === username)
    {
        usernameIsAvailable = false;
        break;
    }
  }
  
  //If the requested name is available, respond ok.
  //Otherwise, respond with an error code and message.
  if (usernameIsAvailable)
  {
    res.send('ok');
  }
  else
  {
    //Here, I am using a 210 response code, since per
    //http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    //that response code is not officially taken.
    //Client-side, though, I'll probably just tell it to read
    //any response other than 200 as erroneous
    res.send(username + ' is taken', 210);
  }
});


//Return the requestor's public IP address
app.get('/myip', function(req, res)
{
  res.send(req.client.remoteAddress);
});


//Return the requested user's FTP server address and port
app.get('/whereis/:username', function(req, res)
{
  var username = req.param('username');
  
  for (var i = 0; i < users.length; i++)
  {
    if (users[i].name === username)
    {
        res.send(users[i].ip + ":" + users[i].port);
        return;
    }
  }
  
  //If none was found:
  res.send("No such user " + username, 210);
});


/*
 * START THE SERVER
 */

app.listen(4000);
console.log('Express server listening on port %d in %s mode', 
    app.address().port, app.settings.env);
