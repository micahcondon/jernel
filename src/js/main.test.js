import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Window, KeyboardEvent } from 'happy-dom';

import init from './main.js';

test('add and remove notes', (t) => {

    let window, document, button, textarea, items;

    t.beforeEach(() => {
        if (window?.happyDOM) {
            window.happyDOM.abort(); // Clears timers, fetch requests, etc.
        }
        window = new Window({ url: 'https://localhost:8080' });
        document = window.document;
        button = document.createElement('button');
        textarea = document.createElement('textarea');
        items = document.createElement('div');
        init(document, button, textarea, items);
    });

    t.test('Button click', (t) => {

        t.test('When textarea is empty, should do nothing', (t) => {
            button.click();
            assert.equal(items.children.length, 0);
        });

        t.test('When textarea has a value, should add a note and clear the textarea', (t) => {
            textarea.value = 'Test note';
            button.click();
            assert.equal(items.children.length, 1);
            assert.equal(items.children[0].querySelector('.text')?.textContent, 'Test note');
            assert.equal('', textarea.value);
        });

    });

    t.test('CTRL+Enter', (t) => {

        t.test('When textarea is empty, should do nothing', (t) => {
            textarea.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', ctrlKey: true }));
            assert.equal(items.children.length, 0);
        });

        t.test('When textarea has a value, CTRL+Enter should add a note and clear the textarea', (t) => {
            textarea.value = 'Test note';
            textarea.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', ctrlKey: true }));
            assert.equal(items.children.length, 1);
            assert.ok(items.children[0].querySelector('.text'));
            assert.equal(items.children[0].querySelector('.text').textContent, 'Test note');
            assert.equal('', textarea.value);
        });

    });

    t.test('Delete note', (t) => {

        t.test('Delete icon should remove note', (t) => {
            textarea.value = 'Test note';
            button.click();
            assert.equal(items.children.length, 1);
            assert.ok(items.children[0].querySelector('.delete'));
            items.children[0].querySelector('.delete').click();
            assert.equal(items.children.length, 0);
        });

    });

    t.test('Edit note', (t) => {

        t.test('Edit and save should update note', (t) => {
            textarea.value = 'Test note';
            button.click();
            assert.equal(items.children.length, 1);
            assert.ok(items.children[0].querySelector('.edit'));
            assert.ok(items.children[0].querySelector('.editor'));
            assert.ok(items.children[0].querySelector('.save'));
            items.children[0].querySelector('.edit').click();
            items.children[0].querySelector('.editor').value = 'Updated note';
            items.children[0].querySelector('.save').click();
            assert.equal(items.children[0].querySelector('.text').textContent, 'Updated note');
        });

    });

});