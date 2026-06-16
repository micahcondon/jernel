import TemplatedElement from './templated-element.js';

const template = document.createElement('template');
template.innerHTML = `<div
    class='content'
    style='white-space: pre-wrap;'></div>`;

class NoteViewer extends TemplatedElement {

    constructor() {
        super();
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
        this.innerHTML = '';
        this.appendChild(template.content.cloneNode(true));
        this._connected = true;
        this._render();
    }

    disconnectedCallback() {
        this._connected = false;
    }

    _render() {
        if (!this._connected) { return;}
        this.querySelector('.content').textContent = this._note?.text || '';
    }
};

customElements.define('note-viewer', NoteViewer);
export default NoteViewer;