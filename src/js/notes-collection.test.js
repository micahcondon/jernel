import { test } from 'node:test';
import assert from 'node:assert/strict';
import NotesCollection from './notes-collection.js';

test('notes-collection', (t) => {

    let collection;

    t.beforeEach(() => {
        collection = new NotesCollection();
    });

    t.test('Add and get note', (t) => {
        assert.equal(Array.from(collection.all()).length, 0);
        const note = collection.add('Hello World');
        assert.ok(note);
        assert.equal(Array.from(collection.all()).length, 1);
        assert.deepEqual(collection.get(note.id), note);
    });

    t.test('Update note', (t) => {
        assert.equal(Array.from(collection.all()).length, 0);
        const note = collection.add('Hello World');
        collection.update(note.id, 'Hello World, edited');
        assert.equal(collection.get(note.id).text, 'Hello World, edited');
    });

    t.test('Delete note', (t) => {
        assert.equal(Array.from(collection.all()).length, 0);
        const note = collection.add('Hello World');
        collection.delete(note.id);
        assert.equal(Array.from(collection.all()).length, 0);
        assert.equal(collection.get(note.id), undefined);
    });
});
