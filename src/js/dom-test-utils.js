import { Window, KeyboardEvent } from 'happy-dom';

export default function initDom() {
    const window = new Window({url: 'https://localhost:8080'});
    Object.assign(globalThis, {
        window,
        document: window.document,
        HTMLElement: window.HTMLElement,
        customElements: window.customElements,
    });
    return window;
}
