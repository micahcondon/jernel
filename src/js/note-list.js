class NoteList extends HTMLElement {

    constructor() {
        super();
        this._notes = undefined;
        this.innerHTML = '';
    }

    set notes(notes) {
        this._notes = notes;
        this.innerHTML = '';
        notes.forEach((note) => {
            const noteElement = document.createElement('editable-note');
            noteElement.note = note;
            this.appendChild(noteElement);
        })
    }

};

customElements.define('note-list', NoteList);
export default NoteList;