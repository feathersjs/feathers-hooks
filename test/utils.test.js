var _ = require('lodash');
var assert = require('assert');

var utils = require('../lib/utils');

function hookMaker(name) {
  return function() {
    return utils.hookObject(name, 'test', arguments);
  };
}

describe('hook utilities', function() {
  it('.hookObject', function() {
    // find
    assert.deepEqual(hookMaker('find')({ some: 'thing' }, _.noop), {
      params: { some: 'thing' },
      method: 'find',
      type: 'test',
      callback: _.noop
    });

    // get
    assert.deepEqual(hookMaker('get')(1, { some: 'thing' }, _.noop), {
      id: 1,
      params: { some: 'thing' },
      method: 'get',
      type: 'test',
      callback: _.noop
    });

    // remove
    assert.deepEqual(hookMaker('remove')(1, { some: 'thing' }, _.noop), {
      id: 1,
      params: { some: 'thing' },
      method: 'remove',
      type: 'test',
      callback: _.noop
    });

    // create
    assert.deepEqual(hookMaker('create')({ my: 'data' }, { some: 'thing' }, _.noop), {
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'create',
      type: 'test',
      callback: _.noop
    });

    // update
    assert.deepEqual(hookMaker('update')(2, { my: 'data' }, { some: 'thing' }, _.noop), {
      id: 2,
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'update',
      type: 'test',
      callback: _.noop
    });

    // patch
    assert.deepEqual(hookMaker('patch')(2, { my: 'data' }, { some: 'thing' }, _.noop), {
      id: 2,
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'patch',
      type: 'test',
      callback: _.noop
    });

    // find in collection
    assert.deepEqual(hookMaker('findInCollection')(3, 'tasks', { some: 'thing' }, _.noop), {
      id: 3,
      collection: 'tasks',
      params: { some: 'thing' },
      method: 'findInCollection',
      type: 'test',
      callback: _.noop
    });

    // get in collection
    assert.deepEqual(hookMaker('getInCollection')(4, 'tasks', 123, { some: 'thing' }, _.noop), {
      id: 4,
      collection: 'tasks',
      documentId: 123,
      params: { some: 'thing' },
      method: 'getInCollection',
      type: 'test',
      callback: _.noop
    });

    // remove from collection
    assert.deepEqual(hookMaker('removeFromCollection')(4, 'tasks', 123, { some: 'thing' }, _.noop), {
      id: 4,
      collection: 'tasks',
      documentId: 123,
      params: { some: 'thing' },
      method: 'removeFromCollection',
      type: 'test',
      callback: _.noop
    });

    // add to collection
    assert.deepEqual(hookMaker('addToCollection')(3, 'tasks', { my: 'data' }, { some: 'thing' }, _.noop), {
      id: 3,
      collection: 'tasks',
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'addToCollection',
      type: 'test',
      callback: _.noop
    });
  });

  it('.makeArguments', function() {
    var args = utils.makeArguments({
      id: 2,
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'update',
      callback: _.noop
    });

    assert.deepEqual(args, [2, { my: 'data' }, { some: 'thing' }, _.noop]);

    args = utils.makeArguments({
      id: 0,
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'update',
      callback: _.noop
    });

    assert.deepEqual(args, [0, { my: 'data' }, { some: 'thing' }, _.noop]);

    args = utils.makeArguments({
      params: { some: 'thing' },
      method: 'find',
      callback: _.noop
    });

    assert.deepEqual(args, [
      { some: 'thing' },
      _.noop
    ]);

    args = utils.makeArguments({
      id: 5,
      collection: 'tasks',
      params: { some: 'thing' },
      method: 'findInCollection',
      callback: _.noop
    });

    assert.deepEqual(args, [5, 'tasks', { some: 'thing' }, _.noop]);

    args = utils.makeArguments({
      id: 6,
      collection: 'tasks',
      data: { my: 'data' },
      params: { some: 'thing' },
      method: 'addToCollection',
      callback: _.noop
    });

    assert.deepEqual(args, [6, 'tasks', { my: 'data' }, { some: 'thing' }, _.noop]);

    args = utils.makeArguments({
      id: 7,
      collection: 'tasks',
      documentId: 123,
      params: { some: 'thing' },
      method: 'removeFromCollection',
      callback: _.noop
    });

    assert.deepEqual(args, [7, 'tasks', 123, { some: 'thing' }, _.noop]);
  });

  it('.convertHookData', function() {
    assert.deepEqual(utils.convertHookData('test'), {
      all: [ 'test' ]
    });

    assert.deepEqual(utils.convertHookData([ 'test', 'me' ]), {
      all: [ 'test', 'me' ]
    });

    assert.deepEqual(utils.convertHookData({
      all: 'thing',
      other: 'value',
      hi: [ 'foo', 'bar' ]
    }), {
      all: [ 'thing' ],
      other: [ 'value' ],
      hi: [ 'foo', 'bar' ]
    });
  });
});
