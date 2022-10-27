// Dark Theme Toggle //

const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}
toggleSwitch.addEventListener('change', switchTheme, false);

// New Book Menu Overlay //

const addBookBtn = document.getElementById('addBookBtn');
addBookBtn.addEventListener('click', bookAdd);

function bookAdd() {
    document.getElementById("book-add-screen").style.width = "100%";
    document.getElementById('page-container').classList.add('blur');
}

function exit() {
    document.getElementById("book-add-screen").style.width = "0%";
    document.getElementById('page-container').classList.remove('blur');
}


// Library Array //

// Object Constructor
function Book(Title, Author, Pages, Started, Read) {
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Started = Started;
    this.Read = Read;
}


// Library Array of Objects/Books
let myLibrary = [];


// Function for adding a new book to array/library
function addBookToLibrary(Title, Author, Pages, Started, Read) {
    let book = new Book(Title, Author, Pages, Started, Read);
    myLibrary.push(book);
}


// Function to display library array on cards
function displayBooksOnPage() {
    const books = document.querySelector("#hero-card-container");

    // Loop over library array and display to the cards
    myLibrary.forEach(myLibrary => {
        const card = document.createElement("div");
        card.classList.add("books");
        books.appendChild(card);
        const span = document.createElement("span");
        card.appendChild(span);
        const img = document.createElement("img");
        span.appendChild(img);
        img.classList.add("icon-or");
        img.classList.add("remove");
        img.src = "resources/delete.png";

        for (let key in myLibrary) {
            const para = document.createElement("p");
            card.appendChild(para);
            para.textContent = (`${key}: `)
            const span = document.createElement("span");
            para.appendChild(span);
            span.textContent = (`${myLibrary[key]}`);
        }
    })
}


// Add Book button push to Book, reset form, close menu
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Retrieve HTML Inputs
    let inputTitle = document.getElementById("book_title");
    let inputAuthor = document.getElementById("book_author");
    let inputPages = document.getElementById("book_pages");
    let inputDate = document.getElementById("book_date");
    let inputRead = document.getElementById("book_read");

    // Assign HTML Inputs to Book, update page
    removeDivs();
    addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, inputDate.value, inputRead.checked);
    displayBooksOnPage();
    updateStats();

    // Reset and quite form
    document.getElementById('form').reset();
    document.getElementById("book-add-screen").style.width = "0%";
    document.getElementById('page-container').classList.remove('blur');
});


// Update in Stats on right side
function updateStats() {
    //Total Books
    let totalBooks = document.querySelector("#total-books");
    totalBooks.textContent = myLibrary.length;

    //Read = True not working
    let totalRead = document.querySelector("#read-books");
    let y = 0;
    y = array.filter((Book) => Book.id === true).length;
    totalRead.textContent = y;
    console.log(y);

    //Unread
    let totalUnread = document.querySelector("#unread-books");
    totalUnread.textContent = myLibrary.length - y;
}

// Remove Doms to re-add library
function removeDivs() {
    const removeDivs = document.querySelectorAll(".books");
    for (let i = 0; i <removeDivs.length; i++) {
        removeDivs[i].remove();
    }
}
