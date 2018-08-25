'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _websocket = require('websocket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var port = 8080;

var router = (0, _express2.default)();

router.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'index.html'));
});

var app = (0, _express2.default)();

app.use('/', router);
app.use(_express2.default.static(__dirname + '/'));

// app.listen(port);

var server = _http2.default.createServer(app);

server.listen(port);

// WebSocketServer:

var connectionArray = [];
var nextID = Date.now();
var appendToMakeUnique = 1;

var wsServer = new _websocket.server({
  httpServer: server,
  autoAcceptConnections: true // do not use in real prod.
});

// seems like this listener is never getting called
wsServer.on('request', function (request) {
  console.log(new Date() + ' Connection from origin ' + request.origin);
});

wsServer.on('connect', function (connection) {
  console.log(new Date() + " Connection accepted.");

  connectionArray.push(connection);

  connection.clientID = nextID++;

  var message = {
    type: "ID",
    id: connection.clientID
  };

  connection.sendUTF(JSON.stringify(message));

  connection.on('message', function (message) {
    if (message.type !== 'utf8') return;

    console.log('Received message: ' + message.utf8Data);

    var parsedMessage = JSON.parse(message.utf8Data);
    var connect = getConnectionForID(parsedMessage.id);

    switch (parsedMessage.type) {
      case "MESSAGE":
        parsedMessage.login = connect.clientLogin;
        parsedMessage.sign = connect.clientSign;
        break;
      case "USERDATA":
        var loginChanged = false;
        var originalLogin = parsedMessage.login;

        while (!isClientLoginUnique(parsedMessage.login)) {
          parsedMessage.login = originalLogin + '_' + appendToMakeUnique++;
          loginChanged = true;
        }

        if (loginChanged) {
          // There is no need to pass a sign or smth other,
          // because only login is used just for a notification
          // about changed login (due to a non-unique original login)
          var changeMessage = {
            id: parsedMessage.id,
            type: "REJECT_USERDATA",
            login: parsedMessage.login
          };

          connect.sendUTF(JSON.stringify(changeMessage));
        }

        connect.clientLogin = parsedMessage.login;
        connect.clientSign = parsedMessage.sign;
        sendUserListToAll();
        break;
    }

    var messageString = JSON.stringify(parsedMessage);
    sendToAllConnections(messageString);
  });

  connection.on('close', function (connection) {
    connectionArray = connectionArray.filter(function (connection) {
      return connection.connected;
    });

    sendUserListToAll();

    console.log(new Date() + " Peer " + connection.remoteAddress + " disconnected.");
  });
});

// function originIsAllowed(origin) {
//   // this is where should ensure the connection should be accepted. return false if it should not be.
//   return true;
// }

function isClientLoginUnique(name) {
  return !connectionArray.some(function (connection) {
    return connection.clientLogin === name;
  });
}

function getConnectionForID(id) {
  var result = connectionArray.find(function (c) {
    return c.clientID === id;
  });

  return result === undefined ? null : result;
}

function makeUserListMessage() {
  var userListMessage = {
    type: 'USERLIST',
    users: []
  };

  connectionArray.forEach(function (connection) {
    userListMessage.users.push({
      login: connection.clientLogin,
      sign: connection.clientSign
    });
  });

  return userListMessage;
}

function sendUserListToAll() {
  var userListMessage = makeUserListMessage();
  var userListMessageString = JSON.stringify(userListMessage);

  sendToAllConnections(userListMessageString);
}

function sendToAllConnections(stringifiedData) {
  connectionArray.forEach(function (connection) {
    connection.sendUTF(stringifiedData);
  });
}
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(port, 'port', 'server-express.js');
  reactHotLoader.register(router, 'router', 'server-express.js');
  reactHotLoader.register(app, 'app', 'server-express.js');
  reactHotLoader.register(server, 'server', 'server-express.js');
  reactHotLoader.register(connectionArray, 'connectionArray', 'server-express.js');
  reactHotLoader.register(nextID, 'nextID', 'server-express.js');
  reactHotLoader.register(appendToMakeUnique, 'appendToMakeUnique', 'server-express.js');
  reactHotLoader.register(wsServer, 'wsServer', 'server-express.js');
  reactHotLoader.register(isClientLoginUnique, 'isClientLoginUnique', 'server-express.js');
  reactHotLoader.register(getConnectionForID, 'getConnectionForID', 'server-express.js');
  reactHotLoader.register(makeUserListMessage, 'makeUserListMessage', 'server-express.js');
  reactHotLoader.register(sendUserListToAll, 'sendUserListToAll', 'server-express.js');
  reactHotLoader.register(sendToAllConnections, 'sendToAllConnections', 'server-express.js');
  leaveModule(module);
})();

;
