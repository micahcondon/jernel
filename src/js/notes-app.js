import TemplatedElement from './templated-element.js';
import EditableNote from './editable-note.js';
import NoteViewer from './note-viewer.js';
import NoteEditor from './note-editor.js';
import NoteList from './note-list.js';
import NotesCollection from './notes-collection.js';

const template = document.createElement('template');
template.innerHTML = `<note-editor></note-editor><note-list></note-list>`;

class NotesApp extends TemplatedElement {

    constructor() {
        super(template);
        this._notes = new NotesCollection();
    }

    connectedCallback() {
        super.connectedCallback();
        const editor = this.querySelector('note-editor');
        const list = this.querySelector('note-list');
        editor.addEventListener('change', (e) => {
            this._notes.add(e.detail.note.text);
            list.notes = this._notes.all();
            editor.note = undefined;
        });
        list.addEventListener('change', (e) => {
            this._notes.update(e.detail.note.id, e.detail.note.text);
            list.notes = this._notes.all();
        });
        list.addEventListener('delete', (e) => {
            this._notes.delete(e.detail.note.id);
            list.notes = this._notes.all();
        });
    }

};

customElements.define('notes-app', NotesApp);
export default NotesApp;
