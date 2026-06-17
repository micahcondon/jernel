import EventEmitter from './event-emitter.js';

export const ALL = 'all',
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete';

const validEventKeys = new Set([ALL, ADD, UPDATE, DELETE]);

export default class NotesCollection {

  constructor() {
    this._notes = new Map();
    this._emitter = new EventEmitter();
  }

  on(key, callback) {
    if (!validEventKeys.has(key)) {
      throw new Error(`Invalid event key: ${key}`);
    }
    return this._emitter.on(key, callback);
  }

  all() {
    return this._notes.values();
  }

  add(body) {
    const id = this._buildId();
    const note = { id, body };
    this._notes.set(id, note);
    this._emitter.emit(ADD, note);
    this._emitAll();
    return note;
  }

  get(id) {
    return this._notes.get(id);
  }

  update(id, body) {
    if (!this._notes.has(id)) {
      throw new Error(`Note with id ${id} not found`);
    }
    this._notes.set(id, {...this.get(id), body });
    this._emitter.emit(UPDATE, this.get(id));
    this._emitAll();
  }

  delete(id) {
    const note = this.get(id) || { id };
    this._notes.delete(id);
    this._emitter.emit(DELETE, note);
    this._emitAll();
  }

  _emitAll() {
    // explicitly using an array here,
    // so we don't share a single iterator across multiple callbacks
    this._emitter.emit(ALL, Array.from(this.all()));
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