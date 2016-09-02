'use strict';
var request = require('request');
var token = "";

/**
 * Check if there is an error.
 * @param code {int} Request status code.
 */
function checkError(code) {
  switch (code) {
    case 400:
      throw new Error('Usually this results from missing a required parameter.');
    case 401:
      throw new Error('No valid access token provided.');
    case 403:
      throw new Error('The access token is not valid for that request.');
    case 404:
      throw new Error('The requested item doesn\'t exist.');
    case 429:
      throw new Error('You have been ratelimited for making too many requests to the server.');
    case code >= 500 && code < 600:
      throw new Error('Something went wrong on Pushbullet\'s side. If this error is from an intermediate server, it may not be valid JSON.');
  }
}

/**
 * Do request to the pushbullet api.
 * @param action {String}
 * @param callback {Function}
 */
function doGetRequest(action, callback) {
  request({
    url: 'https://api.pushbullet.com' + action,
    method: 'GET',
    headers: {'Access-Token': token}
  }, function (error, response, body) {
    try {
      if (error) throw error;
      checkError(response.statusCode);
      callback(null, JSON.parse(body));
    } catch (e) {
      callback(e, JSON.parse(body));
    }
  })
}

/**
 * Do request to the pushbullet api.
 * @param action {String}
 * @param data {Object}
 * @param callback {Function}
 */
function doPostRequest(action, data, callback) {
  request({
    url: 'https://api.pushbullet.com' + action,
    formData: data,
    method: 'POST',
    headers: {'Access-Token': token}
  }, function (error, response, body) {
    try {
      if (error) throw error;
      checkError(response.statusCode);
      callback(null, JSON.parse(body));
    } catch (e) {
      callback(e, JSON.parse(body));
    }
  })
}

/**
 * Do request to the pushbullet api.
 * @param action {String}
 * @param callback {Function}
 */
function doDeleteRequest(action, callback) {
  request({
    url: 'https://api.pushbullet.com' + action,
    method: 'DELETE',
    headers: {'Access-Token': token}
  }, function (error, response, body) {
    try {
      if (error) throw error;
      checkError(response.statusCode);
      callback(null, JSON.parse(body));
    } catch (e) {
      callback(e, JSON.parse(body));
    }
  })
}

module.exports = {
  /**
   * Set the api token.
   * @param newToken The pushbullet api token.
   */
  setToken: function (newToken) {
    token = newToken;
  },
  /**
   * You can send arbitrary JSON messages, called "ephemerals", to all devices on your account.
   * Ephemerals are stored for a short period of time (if at all) and are sent directly to devices.
   * Because they are sent directly, there is no "tickle" message like when creating or updating pushes or
   * other objects, the JSON message appears directly in the stream.
   * @param data
   * @param callback
   */
  sendEphemeral: function (data, callback) {
    doPostRequest('/v2/ephemerals', data, callback);
  },
  /**
   * Get a list of chats belonging to the current user. If you have a large number of chats, you will need to use Pagination.
   * @param callback
   */
  getChats: function (callback) {
    doGetRequest('/v2/chats', callback);
  },
  /**
   * Create a chat with another user or email address if one does not already exist.
   * @param data
   * @param callback
   */
  createChat: function (data, callback) {
    doPostRequest('/v2/chats', data, callback);
  },
  /**
   * Update existing chat object.
   * @param iden
   * @param data
   * @param callback
   */
  updateChat: function (iden, data, callback) {
    doPostRequest('/v2/chats/' + iden, data, callback);
  },
  /**
   * Delete a chat object.
   * @param iden
   * @param callback
   */
  deleteChat: function (iden, callback) {
    doDeleteRequest('/v2/chats/' + iden, callback);
  },
  /**
   * Get a list of devices belonging to the current user. If you have a large number of devices, you will need to use Pagination.
   * @param callback
   */
  getDevices: function (callback) {
    doGetRequest('/v2/devices', callback);
  },
  /**
   * Create a new device.
   * @param data
   * @param callback
   */
  createDevice: function (data, callback) {
    doPostRequest('/v2/devices', data, callback);
  },
  /**
   * Update an existing device.
   * @param iden
   * @param data
   * @param callback
   */
  updateDevice: function (iden, data, callback) {
    doPostRequest('/v2/devices/' + iden, data, callback);
  },
  /**
   * Delete a device.
   * @param iden
   * @param callback
   */
  deleteDevice: function (iden, callback) {
    doDeleteRequest('/v2/devices/' + iden, callback);
  },
  /**
   * Request push history.
   * @param callback
   */
  getPushes: function (callback) {
    doGetRequest('/v2/pushes', callback);
  },
  /**
   * Pushing files is a two-part process: first the file needs to be uploaded, then a push needs to be sent for that file.
   * @param data
   * @param callback
   */
  createPush: function (data, callback) {
    doPostRequest('/v2/pushes', data, callback);
  },
  /**
   * Update a push.
   * @param iden
   * @param data
   * @param callback
   */
  updatePush: function (iden, data, callback) {
    doPostRequest('/v2/pushes/' + iden, data, callback);
  },
  /**
   * Delete a push.
   * @param iden
   * @param callback
   */
  deletePush: function (iden, callback) {
    doDeleteRequest('/v2/pushes/' + iden, callback);
  },
  /**
   * Delete all pushes belonging to the current user. This call is asynchronous, the pushes will be deleted after the call returns.
   * @param callback
   */
  deletePushes: function (callback) {
    doDeleteRequest('/v2/pushes', callback);
  },
  /**
   * Get a list of subscriptions belonging to the current user. If you have a large number of subscriptions, you will need to use Pagination.
   * @param callback
   */
  getSubscriptions: function (callback) {
    doGetRequest('/v2/subscriptions', callback);
  },
  /**
   * Create a new subscription.
   * @param data
   * @param callback
   */
  createSubscription: function (data, callback) {
    doPostRequest('/v2/subscriptions', data, callback);
  },
  /**
   * Update a subscription.
   * @param iden
   * @param data
   * @param callback
   */
  updateSubscription: function (iden, data, callback) {
    doPostRequest('/v2/subscriptions/' + iden, data, callback);
  },
  /**
   * Unsubscribe from a channel.
   * @param iden
   * @param callback
   */
  deleteSubscription: function (iden, callback) {
    doDeleteRequest('/v2/subscriptions/' + iden, callback);
  },
  /**
   * Get information about a channel.
   * @param callback
   */
  getChannelInfo: function (callback) {
    doGetRequest('/v2/channel-info', callback);
  },
  /**
   * Gets the currently logged in user.
   * @param callback
   */
  getUser: function (callback) {
    doGetRequest('/v2/users/me', callback);
  }
}
