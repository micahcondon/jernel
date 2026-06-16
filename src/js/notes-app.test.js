import { test } from 'node:test';
import assert from 'node:assert/strict';

import initDom from './dom-test-utils.js';
initDom();

await import('./notes-app.js');

test('notes-app', (t) => {

    let notesApp;

    t.beforeEach(() => {
        if (window?.happyDOM) {
            window.happyDOM.abort(); // Clears timers, fetch requests, etc.
        }
        document.body.innerHTML = '<notes-app></notes-app>';
        notesApp = document.querySelector('notes-app');
    });

    t.test('Add note', (t) => {

        t.test('Appends a note', (t) => {
            assert.equal(notesApp.querySelector('editable-note'), null);
            notesApp.querySelector('note-editor').dispatchEvent(new CustomEvent('change', {detail: {note: {text: 'Hello World'}}}))
            assert.ok(notesApp.querySelector('editable-note'));
        });

        t.test('Clears the editor', (t) => {
            notesApp.querySelector('note-editor').dispatchEvent(new CustomEvent('change', {detail: {note: {text: 'Hello World'}}}))
            assert.equal(notesApp.querySelector('note-editor')?.note, undefined);
        });

    });

});