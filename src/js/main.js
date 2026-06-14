
function addItem(doc, textarea, items) {
    const text = textarea.value.trim();
    if (!text) { return; }

    const item = doc.createElement('div');
    item.textContent = text;
    item.classList.add('item');

    const deleteButton = doc.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = '🗑';
    deleteButton.addEventListener('click', () => { item.remove(); });
    item.appendChild(deleteButton);

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