import TemplatedElement from './templated-element.js';

const template = document.createElement('template');
template.innerHTML = `<textarea rows='5' cols='20'></textarea><br /><button>Save</button>`;

class NoteEditor extends TemplatedElement {

    constructor() {
        super(template);
        this._note = undefined;
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
        this.querySelector('textarea').addEventListener('input', (e) => e.stopImmediatePropagation());
        this.querySelector('textarea').addEventListener('change', (e) => e.stopImmediatePropagation());
        this.querySelector('button').addEventListener('click', () => this._save());
    }

    _render() {
        if (!this._connected) { return;}
        this.querySelector('textarea').value = this._note?.body || '';
    }

    _save() {
        const note = { ...this._note, body: this.querySelector('textarea').value };
        this._note = note;
        this.dispatchEvent(new CustomEvent('change', { detail: { note }, bubbles: true }));
    }
};

customElements.define('note-editor', NoteEditor);
export default NoteEditor;