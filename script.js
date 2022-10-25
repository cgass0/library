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


// Library Array //

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

function bookAdd() {
    document.getElementById("book-add-screen").style.width = "100%";
    console.log("test");
    document.getElementById('page-container').classList.add('blur');
}