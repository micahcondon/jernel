import NoteViewer from './note-viewer.js';

function addItem(textarea, items) {
    const text = textarea.value.trim();
    if (!text) { return; }

    const item = document.createElement('div');
    item.classList.add('item');

    const viewer = document.createElement('note-viewer');
    viewer.note = { text };
    item.appendChild(viewer);

    const editor = document.createElement('textarea');
    editor.classList.add('editor');
    editor.rows = 5;
    editor.cols = 20;
    editor.value = text;
    editor.style.display = 'none';
    item.appendChild(editor);

    const buttons = document.createElement('div');
    item.appendChild(buttons);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save');
    saveButton.style.display = 'none';
    saveButton.addEventListener('click', () => {
        saveButton.style.display = 'none';
        editor.style.display = 'none';
        viewer.note = { text: editor.value };
        viewer.style.display = 'block';
        editButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
    });
    buttons.appendChild(saveButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = '🗑';
    deleteButton.addEventListener('click', () => { item.remove(); });
    buttons.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = '✎';
    editButton.addEventListener('click', () => {
        viewer.style.display = 'none';
        editor.style.display = 'block';
        saveButton.style.display = 'block';
        editButton.style.display = 'none';
        deleteButton.style.display = 'none';
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