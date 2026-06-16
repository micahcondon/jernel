import TemplatedElement from './templated-element.js';

const template = document.createElement('template');
template.innerHTML = `<div
    class='note'></div>
    <div class='buttons'>
        <button class='edit' title='edit'>✎</button> 
        <button class='delete' title='delete'>🗑</button>
    </div>`;

class EditableNote extends TemplatedElement {

    constructor() {
        super(template);
        this._note = undefined;
        this._editing = false;
    }

    set note(note) {
        this._note = note;
        this._render();
    }

    get note() {
        return this._note;
    }

    connectedCallback() {
        super.connectedCallback();
        this.querySelector('.delete').addEventListener('click', () => this._delete());
        this.querySelector('.edit').addEventListener('click', () => {
            this._editing = !this._editing;
            this._render();
        });
    }

    _render() {
        if (!this._connected) { return;}

        if (this._editing) {
            const noteElement = document.createElement('note-editor');
            noteElement.note = this._note;
            noteElement.addEventListener('change', (e) => {
                this._editing = false;
                this.note = e.detail.note;
            });
            this.querySelector('.note').replaceChildren(noteElement);
        } else {
            const noteElement = document.createElement('note-viewer');
            noteElement.note = this._note;
            this.querySelector('.note').replaceChildren(noteElement);
        }

    }

    _delete() {
        this.dispatchEvent(new CustomEvent('delete', { detail: { note: this._note }, bubbles: true }));
        this.remove();
    }
};

customElements.define('editable-note', EditableNote);
export default EditableNote;