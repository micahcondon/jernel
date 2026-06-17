import { test } from 'node:test';
import assert from 'node:assert/strict';
import EventEmitter from './event-emitter.js';

test('EventEmitter', (t) => {

    let emitter;

    t.beforeEach(() => {
        emitter = new EventEmitter();
    });

    t.test('Subscribe and emit', (t) => {
        let calledWith;
        emitter.on('test', (evt) => calledWith = evt);
        emitter.emit('test', 'Hello World');
        assert.equal(calledWith, 'Hello World');
    });

    t.test('Unsubscribe', (t) => {
        let callCount = 0;
        const unsubscribe = emitter.on('test', evt => callCount++);
        emitter.emit('test', 'Hello World');
        emitter.emit('test', 'Hello World');
        unsubscribe();
        emitter.emit('test', 'Hello World');
        assert.equal(callCount, 2);
    });

    t.test('namedSubscribers', (t) => {
        let callCounters = { a: 0, b: 0 };
        emitter.on('a', (evt) => callCounters.a++);
        emitter.on('b', (evt) => callCounters.b++);
        emitter.emit('a');
        emitter.emit('a');
        emitter.emit('b');
        emitter.emit('b');
        emitter.emit('b');
        emitter.emit('c');
        assert.equal(callCounters.a, 2);
        assert.equal(callCounters.b, 3);
    });

});
