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

//Hello world:
app.get('/', function(req, res)
{
  res.send('SUP BRO');
});

//Register the address and port:
app.get('/reg', function(req, res)
{
  /*for (var i = 0; i < req.length; i++)
  {
    console.log(req[i]);
  }*/
  //console.log(req);
  var ipAddress = req.client.remoteAddress;
  var port = req.client.remotePort;
  res.send("<p>I got your address</p>" +
           "<p>Your I.P. address is: " + ipAddress + "</p>" +
           "<p>The port you used is: " + port + "</p>");
});

/*
 * START THE SERVER
 */

app.listen(4000);
console.log('Express server listening on port %d in %s mode', 
    app.address().port, app.settings.env);
