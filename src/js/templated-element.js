class TemplatedElement extends HTMLElement {

    constructor(template) {
        super();
        this._template = template;
    }

    connectedCallback() {
        this.innerHTML = '';
        this.appendChild(this._template.content.cloneNode(true));
        this._connected = true;
        this._render();
    }

    disconnectedCallback() {
        this._connected = false;
    }

    _render() {
        if (!this._connected) { return;}
    }
};

export default TemplatedElement;