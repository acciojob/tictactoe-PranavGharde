document.getElementById('submit').addEventListener('click', function () {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isbn = document.getElementById('isbn').value.trim();

    if (!title || !author || !isbn) {
        alert("Please fill in all fields.");
        return;
    }

    const existingISBNs = [...document.querySelectorAll("#book-list td:nth-child(3)")].map(td => td.textContent);
    if (existingISBNs.includes(isbn)) {
        alert("This ISBN already exists in the list.");
        return;
    }

    const bookList = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${isbn}</td>
        <td><button class="btn btn-danger btn-sm delete">X</button></td>
    `;

    bookList.appendChild(row);

    // Clear inputs
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
});

document.getElementById('book-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        e.target.closest('tr').remove();
    }
});
