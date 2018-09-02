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
})(); // Express server:

var router = (0, _express2.default)();

router.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'index.html'));
});

var app = (0, _express2.default)();

app.use('/', router);
app.use(_express2.default.static(__dirname + '/'));

var server = _http2.default.createServer(app);

server.listen(process.env.PORT);

// WebSockets:

var APPEND_TO_MAKE_UNIQUE = 1;
var connectionArray = [];
var nextID = Date.now();

var tempVar = null;

var wsServer = new _websocket.server({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', function (request) {
  var status = '';

  tempVar = request.origin;

  if (originIsAllowed(request.origin)) {
    request.accept('', request.origin);
    status = 'accepted';
  } else {
    request.reject();
    status = 'rejected';
  }

  console.log(new Date() + ' Connection from origin ' + request.origin + ' ' + status + '.');
});

wsServer.on('connect', function (connection) {
  connectionArray.push(connection);

  connection.clientID = nextID++;

  var message = {
    type: "ID",
    id: connection.clientID,
    // TEMP
    tempVar: tempVar,
    addr: connection.remoteAddress
  };

  connection.sendUTF(JSON.stringify(message));

  connection.on('message', function (message) {
    if (message.type !== 'utf8') return;

    console.log('Received message: ' + message.utf8Data);

    var parsedMessage = JSON.parse(message.utf8Data);
    var connect = getConnectionForID(parsedMessage.id);

    switch (parsedMessage.type) {
      case "USERDATA":
        var loginChanged = false;
        var originalLogin = parsedMessage.login;
        var appender = APPEND_TO_MAKE_UNIQUE;

        while (!isClientLoginUnique(parsedMessage.login)) {
          parsedMessage.login = originalLogin + '_' + appender++;
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
        connect.clientImage = parsedMessage.image;
        sendUserListToAll();
        break;
      case "MESSAGE":
        parsedMessage.login = connect.clientLogin;
        parsedMessage.sign = connect.clientSign;
        parsedMessage.image = connect.clientImage;
        break;
    }

    var messageString = JSON.stringify(parsedMessage);
    sendToAllConnections(messageString);
  });

  connection.on('close', function (reasonCode, descr) {
    connectionArray = connectionArray.filter(function (connection) {
      return connection.connected;
    });

    sendUserListToAll();

    console.log(new Date() + " Peer " + connection.remoteAddress + " disconnected.");
  });
});

function originIsAllowed(origin) {
  // this is where should ensure the connection should be accepted. return false if it should not be.
  return true;
}

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
      sign: connection.clientSign,
      image: connection.clientImage
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

  reactHotLoader.register(router, 'router', 'src/node/server.js');
  reactHotLoader.register(app, 'app', 'src/node/server.js');
  reactHotLoader.register(server, 'server', 'src/node/server.js');
  reactHotLoader.register(APPEND_TO_MAKE_UNIQUE, 'APPEND_TO_MAKE_UNIQUE', 'src/node/server.js');
  reactHotLoader.register(connectionArray, 'connectionArray', 'src/node/server.js');
  reactHotLoader.register(nextID, 'nextID', 'src/node/server.js');
  reactHotLoader.register(tempVar, 'tempVar', 'src/node/server.js');
  reactHotLoader.register(wsServer, 'wsServer', 'src/node/server.js');
  reactHotLoader.register(originIsAllowed, 'originIsAllowed', 'src/node/server.js');
  reactHotLoader.register(isClientLoginUnique, 'isClientLoginUnique', 'src/node/server.js');
  reactHotLoader.register(getConnectionForID, 'getConnectionForID', 'src/node/server.js');
  reactHotLoader.register(makeUserListMessage, 'makeUserListMessage', 'src/node/server.js');
  reactHotLoader.register(sendUserListToAll, 'sendUserListToAll', 'src/node/server.js');
  reactHotLoader.register(sendToAllConnections, 'sendToAllConnections', 'src/node/server.js');
  leaveModule(module);
})();

;
