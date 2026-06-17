import { test } from 'node:test';
import assert from 'node:assert/strict';
import NotesCollection, { ADD, UPDATE, DELETE, ALL } from './notes-collection.js';

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
        assert.equal(collection.get(note.id).body, 'Hello World, edited');
    });

    t.test('Update non existent note throws', (t) => {
        assert.throws(() => collection.update('1234', 'Hello World, edited'));
    });

    t.test('Delete note', (t) => {
        assert.equal(Array.from(collection.all()).length, 0);
        const note = collection.add('Hello World');
        collection.delete(note.id);
        assert.equal(Array.from(collection.all()).length, 0);
        assert.equal(collection.get(note.id), undefined);
    });

    t.test('Delete non existent note does not throw', (t) => {
        assert.doesNotThrow(() => collection.delete('1234'));
    })

    t.test('Events', (t) => {

        t.test('Add emits ADD and ALL', (t) => {
            let addedNote;
            let allNotes;
            collection.on(ADD, (note) => { addedNote = note; });
            collection.on(ALL, (notes) => { allNotes = Array.from(notes); });
            const note = collection.add('Hello World');
            assert.deepEqual(addedNote, note);
            assert.deepEqual(allNotes, [ note ]);
        });

        t.test('Update emits ADD and ALL', (t) => {
            let updatedNote;
            let allNotes;
            collection.on(UPDATE, (note) => { updatedNote = note; });
            collection.on(ALL, (notes) => { allNotes = Array.from(notes); });
            const note = collection.add('Hello World');
            assert.deepEqual(allNotes, [ { id: note.id, body: 'Hello World' } ]);
            collection.update(note.id, 'Hello World, edited');
            assert.deepEqual(updatedNote, { id: note.id, body: 'Hello World, edited' });
            assert.deepEqual(allNotes, [ { id: note.id, body: 'Hello World, edited' } ]);
        });

        t.test('Delete emits DELETE and ALL', (t) => {
            let deletedNote;
            let allNotes;
            collection.on(DELETE, (note) => { deletedNote = note; });
            collection.on(ALL, (notes) => { allNotes = Array.from(notes); });
            const note = collection.add('Hello World');
            collection.delete(note.id);
            assert.deepEqual(deletedNote, note);
            assert.deepEqual(allNotes, []);
        });
    })
});
