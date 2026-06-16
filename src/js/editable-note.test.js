import { test } from 'node:test';
import assert from 'node:assert/strict';

import initDom from './dom-test-utils.js';
initDom();

await import('./editable-note.js');

test('editable-note', (t) => {

    t.beforeEach(() => {
        if (window?.happyDOM) {
            window.happyDOM.abort(); // Clears timers, fetch requests, etc.
        }
        document.body.innerHTML = '';
    });

    t.test('Render', (t) => {

        t.test('Set note before render', (t) => {
            const editableNote = document.createElement('editable-note');
            editableNote.note = { text: 'Hello World' };
            document.body.appendChild(editableNote);
            assert.equal(editableNote.querySelector('note-viewer')?.note?.text, 'Hello World');
        });

        t.test('Set note after render', (t) => {
            const editableNote = document.createElement('editable-note');
            document.body.appendChild(editableNote);
            editableNote.note = { text: 'Hello World' };
            assert.equal(editableNote.querySelector('note-viewer')?.note?.text, 'Hello World');
        });

        t.test('Update note after render', (t) => {
            const editableNote = document.createElement('editable-note');
            editableNote.note = { text: 'Hello World' };
            document.body.appendChild(editableNote);
            assert.equal(editableNote.querySelector('note-viewer')?.note?.text, 'Hello World');
            editableNote.note = { text: 'Hello World, edited' };
            assert.equal(editableNote.querySelector('note-viewer')?.note?.text, 'Hello World, edited');
        });

    });

    t.test('Edit', (t) => {

        t.test('Should toggle edit mode', (t) => {
            const editableNote = document.createElement('editable-note');
            editableNote.note = { text: 'Hello World' };
            document.body.appendChild(editableNote);
            assert.ok(editableNote.querySelector('note-viewer'));
            assert.equal(editableNote.querySelector('note-editor'), null);
            editableNote.querySelector('.edit').click();
            assert.ok(editableNote.querySelector('note-editor'));
            assert.equal(editableNote.querySelector('note-editor')?.note?.text, 'Hello World');
            assert.equal(editableNote.querySelector('note-viewer'), null);
            editableNote.querySelector('.edit').click();
            assert.ok(editableNote.querySelector('note-viewer'));
            assert.equal(editableNote.querySelector('note-editor'), null);
        });

        t.test('Should update on change', (t) => {
            const editableNote = document.createElement('editable-note');
            editableNote.note = { text: 'Hello World' };
            document.body.appendChild(editableNote);
            editableNote.querySelector('.edit').click();
            editableNote.querySelector('note-editor').dispatchEvent(new CustomEvent('change', { detail: { note: { text: 'Hello World, edited' } }, bubbles: true }))
            assert.ok(editableNote.querySelector('note-viewer'));
            assert.equal(editableNote.querySelector('note-viewer').note?.text, 'Hello World, edited');
        });

        t.test('Should allow event to bubble on change', (t) => {
            const editableNote = document.createElement('editable-note');
            editableNote.note = { id: 1, text: 'Hello World' };
            document.body.appendChild(editableNote);
            let changedNote;
            editableNote.addEventListener('change', e => changedNote = e.detail.note);
            editableNote.querySelector('.edit').click();
            editableNote.querySelector('note-editor').dispatchEvent(new CustomEvent('change', { detail: { note: { id: 1, text: 'Hello World, edited' } }, bubbles: true }))
            assert.deepEqual(changedNote, { id: 1, text: 'Hello World, edited' });
        });
    });

    t.test('Delete', (t) => {

        t.test('Should dispatch event', (t) => {
            const editableNote = document.createElement('editable-note');
            editableNote.note = { id: 1, text: 'Hello World' };
            document.body.appendChild(editableNote);
            assert.ok(document.querySelector('editable-note'));
            let deletedNote;
            editableNote.addEventListener('delete', (e) => { deletedNote = e.detail.note; });
            editableNote.querySelector('.delete').click();
            assert.deepEqual(deletedNote, { id: 1, text: 'Hello World' });
        });

        t.test('Should remove', (t) => {
            const editableNote = document.createElement('editable-note');
            editableNote.note = { text: 'Hello World' };
            document.body.appendChild(editableNote);
            assert.ok(document.querySelector('editable-note'));
            editableNote.querySelector('.delete').click();
            assert.equal(document.querySelector('editable-note'), null);
        });

    });

});