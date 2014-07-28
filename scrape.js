var request = require('request');
var Parser  = require('jq-html-parser');

module.exports = function (username, callback) {

  if (typeof username !== 'string' || username.length < 1) {
    throw 'Invalid username: ' + username;
  }

  if (typeof callback !== 'function') {
    throw 'Invalid callback';
  }

  var url = 'https://www.npmjs.org/~' + username;

  request.get(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var parser = new Parser({
        username: '#profile h1',
        metaNames: {
          selector: '#profile table.metadata tr th',
          multiple: true
        },
        metaValues: {
          selector: '#profile table.metadata tr td',
          multiple: true
        },
        email: {
          selector: '#profile #email',
          attribute: 'data-email'
        },
        moduleNames: {
          selector: '#profile ul:first li a',
          multiple: true
        },
        moduleUrls: {
          selector: '#profile ul:first li a',
          attribute: 'href',
          multiple: true
        },
        moduleDescriptions: {
          selector: '#profile ul:first li',
          ignore: 'a',
          multiple: true
        }
      });

      var data = parser.parse(body);
      var user = {modules: []};

      if (data.username) {
        user.username = data.username;
      }

      if (data.email) {
        user.email = data.email.split('%').slice(1).map(function (x) {
          return String.fromCharCode(parseInt(x,16));
        }).join('');
      }

      var i, l;
      if (data.moduleNames) {
        for (i = 0, l = data.moduleNames.length; i < l; i++) {
          user.modules.push({
            name: data.moduleNames[i],
            url: data.moduleUrls[i],
            description: data.moduleDescriptions[i]
          });
        }
      }

      var name;
      if (data.metaNames) {
        for (i = 0, l = data.metaNames.length; i < l; i++) {
          name = data.metaNames[i].toLowerCase().replace(' ', '_').replace('.', '_');
          if (name === 'email') continue;
          user[name] = data.metaValues[i];
          if (name === 'twitter') {
            user[name] = user[name].substr(1);
          }
        }
      }

      callback(user);
    } else if (response.statusCode === 404) {
      callback(null);
    } else if (error) {
      throw error;
    } else {
      throw 'Invalid status code: ' + response.statusCode;
    }

  });

};
