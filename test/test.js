var assert = require('assert');
var authorScrape = require('../scrape.js');

describe('authorScrape()', function () {
  it('should check for missing/invalid arguments', function () {

    assert.throws(function () {
      authorScrape();
    }, /^Invalid username/);

    assert.throws(function () {
      authorScrape(null);
    }, /^Invalid username/);

    assert.throws(function () {
      authorScrape(1);
    }, /^Invalid username/);

    assert.throws(function () {
      authorScrape('aiham');
    }, /^Invalid callback/);

    assert.throws(function () {
      authorScrape('aiham', null);
    }, /^Invalid callback/);

  });

  it('should fail gracefully when author does not exist', function (done) {

    assert.doesNotThrow(function () {
      authorScrape('this-is-surely-not-a-real-user-right', function (user) {
        assert.strictEqual(user, null);
        done();
      });
    });

  });

  it('should get list of modules for existing author', function (done) {

    assert.doesNotThrow(function () {
      authorScrape('aiham', function (user) {
        assert.ok(user);
        assert.strictEqual(typeof user, 'object');
        assert.strictEqual(user.username, 'aiham');
        assert.strictEqual(user.email, 'aiham@aiham.net');
        assert.strictEqual(user.full_name, 'Aiham Hammami');
        assert.strictEqual(user.github, 'aiham');
        assert.strictEqual(user.twitter, 'aihamh');
        assert.strictEqual(user.homepage, 'http://www.aiham.net');
        assert.strictEqual(user.irc_handle, 'aiham');
        assert.strictEqual(user.hasOwnProperty('app_net'), false);
        assert.strictEqual(user.modules.length > 0, true);
        done();
      });
    });

  });

  it('should fail gracefully when author has no modules/metadata', function (done) {

    assert.doesNotThrow(function () {
      authorScrape('bob', function (user) {
        assert.ok(user);
        assert.strictEqual(typeof user, 'object');
        assert.strictEqual(user.username, 'bob');
        assert.strictEqual(user.email, 'bob@email.com');
        assert.strictEqual(user.hasOwnProperty('full_name'), false);
        assert.strictEqual(user.hasOwnProperty('github'), false);
        assert.strictEqual(user.hasOwnProperty('twitter'), false);
        assert.strictEqual(user.hasOwnProperty('homepage'), false);
        assert.strictEqual(user.hasOwnProperty('irc_handle'), false);
        assert.strictEqual(user.hasOwnProperty('app_net'), false);
        assert.strictEqual(user.modules.length === 0, true);
        done();
      });
    });

  });
});
