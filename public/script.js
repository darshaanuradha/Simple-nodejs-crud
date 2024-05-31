async function fetchItems() {
    const response = await fetch('/items');
    const items = await response.json();
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(item.id);
        li.appendChild(deleteButton);
        itemList.appendChild(li);
    });
}

async function deleteItem(id) {
    await fetch('/items/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ id })
    });
    fetchItems();
}

fetchItems();