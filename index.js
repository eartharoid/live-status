/**
 * @name live-status
 * @author eartharoid <contact@eatharoid.me>
 * @website https://eartharoid.me/
 * @license MIT
 */

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const fs = require('fs');
const log = require('leekslazylogger');
const config = require('./config.js');
const io = require('socket.io')(http);

let currentStatus = {};
const activity = ['in a voice chat', 'in a video chat', 'recording', 'streaming', 'offline'];

// logger setup
log.setup({
  logToFile: false,
  timestamp: "DD/MM/YY hh:mm:ss"
});

const sock = (text, type) => {
  return log[type || "console"](`[SOCKET] ${text}`);
}

// assets etc
app.use(express.static("./public/"));

// index page (control panel)
app.get("/", (req, res) => {
  log.console(`Serving request for the control panel`);
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(fs.readFileSync("./views/index.html"));
  res.end();
});

// view page (kiosk)
app.get("/view", (req, res) => {
  log.console(`Serving request for the viewing panel`);
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(fs.readFileSync("./views/view.html"));
  res.end();
});



// websocket connection
io.on('connection', (socket) => {
  // connected to client, send them current data
  sock(`Established a socket connection`);
  io.emit('update', {data: currentStatus, change: false});
  io.emit('settings', config);


  // upon receiving a status change
  socket.on('changeStatus', (data) => {
    sock(`${data.user} is ${activity[data.btn]}`, 'info');

    if (data.btn == 4) {
      delete currentStatus[data.user]
    } else {
      currentStatus[data.user] = data.btn;
    };

    // send new statuses to view page
    io.emit('update', {data: currentStatus, change: true});
  });

	socket.on('setOffline', (user) => {

		delete currentStatus[user];

		// send new statuses to view page
		io.emit('update', { data: currentStatus, change: true });
	});


  // after loading the page
  socket.on('loaded', (data) => {
    if (data) {
      sock(`The live view page has been loaded`, 'success');
      io.emit('update', {data: currentStatus, change: true});
    } else {
      io.emit('update', {data: currentStatus, change: false});
      
    };
  });

  // is anyone there?
  socket.on('disconnect', (data) => {
    io.emit('ping', "Are you still there?");
  });
});



log.info("Starting HTTP server")
http.listen(config.port, () => log.success(`Live notifier app listening on port ${config.port}`));