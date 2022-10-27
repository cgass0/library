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
    document.getElementById('page-container').classList.add('blur');
    document.getElementById("book-add-screen").classList.add('showing');
}

function exit() {
    document.getElementById("book-add-screen").classList.remove('showing');
    document.getElementById('page-container').classList.remove('blur');
}


//                                             Library Array                            //

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
    let index = 0;

    myLibrary.forEach(myLibrarys => {
        index++

        // Creating new cards for book display
        const card = document.createElement("div");
        card.classList.add("books");
        card.setAttribute('id', index);
        books.appendChild(card);
        

        // Adding delete button in top corner of card
        const rmBtn = document.createElement("input"); 
        rmBtn.type = "image";
        card.appendChild(rmBtn);
        rmBtn.classList.add("icon-or");
        rmBtn.classList.add("remove");
        rmBtn.src = "resources/delete.png";

        // Loop over library array and display to the cards
        for (let key in myLibrarys) {
            const para = document.createElement("p");
            card.appendChild(para);
            para.textContent = (`${key}: `)
            const span = document.createElement("span");
            para.appendChild(span);
            span.textContent = (`${myLibrarys[key]}`);
        }

        // Adding Read slider to bottom of card and status
        const label = document.createElement("label"); 
        const input = document.createElement("input");
        const span = document.createElement("span");
        const lastP = card.lastChild;
        if (lastP.textContent.includes("true")) {
            input.checked = true;
        }

        lastP.textContent = "";
        input.type = "checkbox";
        input.classList.add("read-slider");
        lastP.classList.add("slider-check");
        lastP.appendChild(label);
        label.classList.add("switch-read");
        label.appendChild(input);
        label.appendChild(span);
        span.classList.add("slider-read");
        span.classList.add("round-read");
    })

    // Function for removing books from display;
    removeBook();
    toggleRead();
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
    let y = myLibrary.filter(Book => Book.Read === true);
    

    totalRead.textContent = y.length;

    //Unread
    let totalUnread = document.querySelector("#unread-books");
    totalUnread.textContent = myLibrary.length - y.length;
}


// Remove Doms to re-add library
function removeDivs() {
    const removeDivs = document.querySelectorAll(".books");
    for (let i = 0; i <removeDivs.length; i++) {
        removeDivs[i].remove();
    }
}


// Remove Book from Library and Display
function removeBook() {

    let btn = document.getElementsByClassName('remove');
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function(e) {
            let arrayID = e.currentTarget.parentElement.id; // retrieve parent element ID from index
            myLibrary.splice(Number(arrayID)-1, 1); // splice at id-1 for 1

            e.currentTarget.parentNode.remove(); // remove from display

            updateStats(); // update stats on side live
        }, false);
    }
}


// Toogle read/unread inside myLibrary
function toggleRead() {
    let checkbox = document.getElementsByClassName('read-slider');
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', function(e) { 

            let arrayID = e.currentTarget.parentNode.parentNode.parentNode.id; // retrieve parent element ID from index
        
            if (e.currentTarget.checked) {
                myLibrary[arrayID-1].Read = true; // find value in myLibrary and updates
              } else {
                myLibrary[arrayID-1].Read = false; // find value in myLibrary and updates
            }

            updateStats(); // update stats on side live

        }, false);
    }
}

// Filler Books for examples form start
addBookToLibrary("Harry Potter", "JK Rowling", 400, "2022-10-11", true);
addBookToLibrary("Lord of The Rings", "RR Tolken", 300, "2021-09-21", false);
displayBooksOnPage();
updateStats();