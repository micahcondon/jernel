import { test } from 'node:test';
import assert from 'node:assert/strict';

import initDom from './dom-test-utils.js';
const { window, document } = initDom();

await import('./note-viewer.js');

test('note-viewer', (t) => {

    t.beforeEach(() => {
        if (window?.happyDOM) {
            window.happyDOM.abort(); // Clears timers, fetch requests, etc.
        }
        document.body.innerHTML = '';
    });

    t.test('Render', (t) => {

        t.test('With no note', (t) => {
            const viewer = document.createElement('note-viewer');
            document.body.appendChild(viewer);
            assert.equal(viewer.textContent, '');
        });

        t.test('Set note before render', (t) => {
            const viewer = document.createElement('note-viewer');
            viewer.note = { text: 'Hello World' };
            document.body.appendChild(viewer);
            assert.equal(viewer.textContent, 'Hello World');
        });

        t.test('Set note after render', (t) => {
            const viewer = document.createElement('note-viewer');
            document.body.appendChild(viewer);
            assert.equal(viewer.textContent, '');
            viewer.note = { text: 'Hello World' };
            assert.equal(viewer.textContent, 'Hello World');
        });

        t.test('Update note after render', (t) => {
            const viewer = document.createElement('note-viewer');
            viewer.note = { text: 'Hello World' };
            document.body.appendChild(viewer);
            assert.equal(viewer.textContent, 'Hello World');
            viewer.note = { text: 'Hello World, edited' };
            assert.equal(viewer.textContent, 'Hello World, edited');
        });

    });
});