// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let tablerows = document.querySelectorAll("tr[data-title]");

let description = document.querySelectorAll("th:nth-of-type(2), td:nth-of-type(2)");

description.forEach(cell => {
    // cell.style.backgroundColor = "red";
    // console.log(cell.innerHTML, cell.style.width.valueOf());
});

console.log(description);

tablerows.forEach(row => {
    row.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        const id = this.getAttribute('data-id');
        const url = this.getAttribute('data-type');
        // handleTableRowClick(url, id, title);
        goToPage("Activities","Details",id);
        storeCookie("lastPage", getPreviousPage())
    });
});


function handleTableRowClick(title) {
    // Your logic here
    console.log('Clicked row with title:', title);
    // Add whatever you want to do with the title
}

function goToPage(controller, action, id) {
    let page = `/${controller}/${action}/${id}`
    window.location.href = page;
}

function storeCookie(name, value){
    document.cookie = `${name}=${value}; path=/`;
}

function getPreviousPage() {
    return document.URL.valueOf();
}