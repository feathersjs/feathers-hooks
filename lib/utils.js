'use strict';

var _ = require('lodash');

function getOrRemove(args) {
  return {
    id: args[0],
    params: args[1],
    callback: args[2]
  };
}

function updateOrPatch(args) {
  return {
    id: args[0],
    data: args[1],
    params: args[2],
    callback: args[3]
  };
}

function removeOrGetInCollection(args) {
  return {
    id: args[0],
    collection: args[1],
    documentId: args[2],
    params: args[3],
    callback: args[4]
  };
}

exports.converters = {
  find: function(args) {
    return {
      params: args[0],
      callback: args[1]
    };
  },
  create: function(args) {
    return {
      data: args[0],
      params: args[1],
      callback: args[2]
    };
  },
  get: getOrRemove,
  remove: getOrRemove,
  update: updateOrPatch,
  patch: updateOrPatch,
  findInCollection: function(args) {
    return {
      id: args[0],
      collection: args[1],
      params: args[2],
      callback: args[3]
    };
  },
  addToCollection: function(args) {
    return {
      id: args[0],
      collection: args[1],
      data: args[2],
      params: args[3],
      callback: args[4]
    };
  },
  getInCollection: removeOrGetInCollection,
  removeFromCollection: removeOrGetInCollection
};

exports.hookObject = function(method, type, args) {
  var hook = exports.converters[method](args);

  hook.method = method;
  hook.type = type;

  return hook;
};

exports.makeArguments = function(hookObject) {
  var result = [];
  if(typeof hookObject.id !== 'undefined') {
    result.push(hookObject.id);
  }

  if (hookObject.collection) {
    result.push(hookObject.collection);
  }

  if(hookObject.data) {
    result.push(hookObject.data);
  }

  if (typeof hookObject.documentId !== 'undefined') {
    result.push(hookObject.documentId);
  }

  result.push(hookObject.params || {});
  result.push(hookObject.callback);

  return result;
};

exports.convertHookData = function(obj) {
  var hookObject = {};

  if(_.isArray(obj)) {
    hookObject = { all: obj };
  } else if(typeof obj !== 'object') {
    hookObject = { all: [ obj ] };
  } else {
    _.each(obj, function(value, key) {
      hookObject[key] = !_.isArray(value) ? [ value ] : value;
    });
  }

  return hookObject;
};
