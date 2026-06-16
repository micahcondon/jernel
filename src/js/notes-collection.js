export default class NotesCollection {

  constructor() {
    this._notes = new Map();
  }

  all() {
    return this._notes.values();
  }

  add(text) {
    const id = this._buildId();
    const note = { id, text };
    this._notes.set(id, note);
    return note;
  }

  get(id) {
    return this._notes.get(id);
  }

  update(id, text) {
    this._notes.set(id, { id, text });
  }

  delete(id) {
    this._notes.delete(id);
  }

  _buildId() {
    const dateId = new Date()
        .toISOString()
        .replaceAll('-','')
        .replaceAll(':','')
        .replace(/\D+/g,'.') + 'z';
    let id = dateId;
    let counter = 1;
    while (this._notes.has(id)) {
      id = `${dateId}.${counter++}`;
    }
    return id;
  }
}