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

function bookAdd() {
    document.getElementById("book-add-screen").style.width = "100%";
    document.getElementById('page-container').classList.add('blur');
}

function exit() {
    document.getElementById("book-add-screen").style.width = "0%";
    document.getElementById('page-container').classList.remove('blur');
}


// Library Array //

let myLibrary = [];
let newBook;

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBookToLibrary);

//Book Constructor
class Book {
  constructor(title, author, pages, read) {
      this.title = form.title.value; 
      this.author = form.author.value; 
      this.pages = form.pages.value + 'pg'; 
      this.date = form.date.value;
      this.read = form.read.checked; 
  }
}

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  event.preventDefault();
    popUpForm.style.display = 'none';

    newBook = new Book(title, author, pages, date, read); 
    myLibrary.push(newBook); 
    setData();  //saves updated array in local storage
    render(); 
    form.reset();
}

