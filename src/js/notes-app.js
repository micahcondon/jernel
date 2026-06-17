import TemplatedElement from './templated-element.js';
import EditableNote from './editable-note.js';
import NoteViewer from './note-viewer.js';
import NoteEditor from './note-editor.js';
import NoteList from './note-list.js';
import NotesCollection, { ALL } from './notes-collection.js';

const template = document.createElement('template');
template.innerHTML = `<note-editor></note-editor><note-list></note-list>`;

class NotesApp extends TemplatedElement {

    constructor() {
        super(template);
        this._notes = new NotesCollection();
        this._unsubscribe = null;
    }

    connectedCallback() {
        super.connectedCallback();
        const editor = this.querySelector('note-editor');
        const list = this.querySelector('note-list');
        this._unsubscribe = this._notes.on(ALL, notes => list.notes = notes);
        editor.addEventListener('change', (e) => {
            if (!e.detail.note.body.trim()) {
                return;
            }
            editor.note = undefined;
            this._notes.add(e.detail.note.body);
        });
        list.addEventListener('change', (e) => {
            this._notes.update(e.detail.note.id, e.detail.note.body);
        });
        list.addEventListener('delete', (e) => {
            this._notes.delete(e.detail.note.id);
        });
    }

    disconnectedCallback() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }
};

customElements.define('notes-app', NotesApp);
export default NotesApp;
