
function addItem(doc, textarea, items) {
    const text = textarea.value.trim();
    if (!text) { return; }

    const item = doc.createElement('div');
    item.classList.add('item');

    const viewer = doc.createElement('div');
    viewer.classList.add('text');
    viewer.textContent = text;
    viewer.style = 'white-space: pre-wrap;';
    item.appendChild(viewer);

    const editor = doc.createElement('textarea');
    editor.classList.add('editor');
    editor.rows = 5;
    editor.cols = 20;
    editor.value = text;
    editor.style.display = 'none';
    item.appendChild(editor);

    const buttons = doc.createElement('div');
    item.appendChild(buttons);

    const saveButton = doc.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('save');
    saveButton.style.display = 'none';
    saveButton.addEventListener('click', () => {
        saveButton.style.display = 'none';
        editor.style.display = 'none';
        viewer.textContent = editor.value;
        viewer.style.display = 'block';
        editButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
    });
    buttons.appendChild(saveButton);

    const deleteButton = doc.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = '🗑';
    deleteButton.addEventListener('click', () => { item.remove(); });
    buttons.appendChild(deleteButton);

    const editButton = doc.createElement('button');
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

export default function init(doc, button, textarea, items) {
    const handleAddItem = () => addItem(doc, textarea, items);
    button.addEventListener('click', () => handleAddItem());
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleAddItem();
        }
    });
}