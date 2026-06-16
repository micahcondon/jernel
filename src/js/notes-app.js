import TemplatedElement from './templated-element.js';
import EditableNote from './editable-note.js';
import NoteViewer from './note-viewer.js';
import NoteEditor from './note-editor.js';

const template = document.createElement('template');
template.innerHTML = `<note-editor></note-editor><div class='notes'></div>`;

class NotesApp extends TemplatedElement {

    constructor() {
        super(template);
    }

    connectedCallback() {
        super.connectedCallback();
        const editor = this.querySelector('note-editor');
        const notes = this.querySelector('.notes');
        editor.addEventListener('change', (e) => {
            const noteElement = document.createElement('editable-note');
            noteElement.note = e.detail.note;
            editor.note = undefined;
            notes.appendChild(noteElement);
        });
    }

};

customElements.define('notes-app', NotesApp);
export default NotesApp;
