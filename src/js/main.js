import NoteViewer from './note-viewer.js';
import NoteEditor from './note-editor.js';

function addItem(textarea, items) {
    const text = textarea.value.trim();
    if (!text) { return; }

    const item = document.createElement('div');
    item.classList.add('item');

    const viewer = document.createElement('note-viewer');
    viewer.note = { text };
    item.appendChild(viewer);

    const editor = document.createElement('note-editor');
    editor.note = { text };
    editor.style.display = 'none';
    item.appendChild(editor);

    const buttons = document.createElement('div');
    item.appendChild(buttons);

    editor.addEventListener('change', (e) => {
        editor.style.display = 'none';
        viewer.note = e.detail.note;
        viewer.style.display = 'block';
        buttons.style.display = 'block';
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = '🗑';
    deleteButton.addEventListener('click', () => { item.remove(); });
    buttons.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = '✎';
    editButton.addEventListener('click', () => {
        buttons.style.display = 'none';
        viewer.style.display = 'none';
        editor.style.display = 'block';
    });
    buttons.appendChild(editButton);

    items.appendChild(item);

    textarea.value = '';
}

export function init({ button, textarea, items }) {
    const handleAddItem = () => addItem(textarea, items);
    button.addEventListener('click', () => handleAddItem());
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleAddItem();
        }
    });
}