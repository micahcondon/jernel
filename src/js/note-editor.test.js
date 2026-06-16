import { test } from 'node:test';
import assert from 'node:assert/strict';

import initDom from './dom-test-utils.js';
initDom();

await import('./note-editor.js');

test('note-editor', (t) => {

    t.beforeEach(() => {
        if (window?.happyDOM) {
            window.happyDOM.abort(); // Clears timers, fetch requests, etc.
        }
        document.body.innerHTML = '';
    });

    t.test('Render', (t) => {

        t.test('With no note', (t) => {
            const editor = document.createElement('note-editor');
            document.body.appendChild(editor);
            assert.equal(editor.querySelector('textarea')?.value, '');
        });

        t.test('Set note before render', (t) => {
            const editor = document.createElement('note-editor');
            editor.note = { body: 'Hello World' };
            document.body.appendChild(editor);
            assert.equal(editor.querySelector('textarea')?.value, 'Hello World');
        });

        t.test('Set note after render', (t) => {
            const editor = document.createElement('note-editor');
            document.body.appendChild(editor);
            assert.equal(editor.querySelector('textarea')?.value, '');
            editor.note = { body: 'Hello World' };
            assert.equal(editor.querySelector('textarea')?.value, 'Hello World');
        });

        t.test('Update note after render', (t) => {
            const editor = document.createElement('note-editor');
            editor.note = { body: 'Hello World' };
            document.body.appendChild(editor);
            assert.equal(editor.querySelector('textarea')?.value, 'Hello World');
            editor.note = { body: 'Hello World, edited' };
            assert.equal(editor.querySelector('textarea')?.value, 'Hello World, edited');
        });

    });

    t.test('On Change', (t) => {

        t.test('Emits note detail', (t) => {
            const editor = document.createElement('note-editor');
            document.body.appendChild(editor);
            let note;
            editor.addEventListener('change', (e) => { note = e.detail.note;})
            editor.querySelector('textarea').value = 'Hello World!';
            editor.querySelector('button').click();
            assert.deepEqual(note, { body: 'Hello World!' });
        });

    });
});