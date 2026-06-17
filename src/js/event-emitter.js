export default class EventEmitter {

    constructor() {
        this._listeners = new Map();
    }

    on(key, callback) {
        if (!this._listeners.has(key)) {
            this._listeners.set(key, new Set());
        }
        const listeners = this._listeners.get(key);
        const ref = new WeakRef(callback);
        listeners.add(ref);
        return () => listeners.delete(ref);
    }

    emit(key, event) {
        for (const ref of this._listeners.get(key) || []) {
            const callback = ref.deref();
            if (callback) {
                callback(event);
            }
        }
    }

}