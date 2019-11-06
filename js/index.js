document.addEventListener("DOMContentLoaded", function() {
    const baseURI = "http://localhost:3000/books"
//Get a list of books & render them
function getBooks() {
    fetch(baseURI)
    .then(books => books.json())
    .then(books => bookMenu(books))
}
    function bookMenu(books) {
        for(let i = 0; i < books.length; i ++) {
            showBooks(books[i])
        }
    }

    function showBooks(book) {
        // console.log(book)
        bookList = document.querySelector("#list")
        bList = document.createElement("li")
        bList.innerText = book.title
        bookList.appendChild(bList).addEventListener("click", (e) => {
            bookInfo(book)
            clickedBook(e)
        })
    }

    function bookInfo(book) {
        showB = document.querySelector("#show-panel")
        showB.innerHTML = ""
        bookShow = document.createElement("h1")
        bookShow.innerText = book.title
        bookImg = document.createElement("img")
        bookImg.src = book.img_url
        bookDesc = document.createElement("h3")
        bookDesc.innerText = book.description
        bookUsers = document.createElement("ul")
        bookLiker = document.createElement("button")
        bookLiker.innerText = "Like This Book!"

        book.users.forEach(user => {
            newLi = document.createElement("li")
            newLi.innerText = user.username
            bookUsers.appendChild(newLi)
        })

        showB.appendChild(bookShow)
        showB.appendChild(bookImg)
        showB.appendChild(bookDesc)
        showB.appendChild(bookLiker).addEventListener("click", (e) => {
            likeABook(e, book)
            .then(books => bookInfo(books))
        })
        showB.appendChild(bookUsers)
    }

    function clickedBook(e) {
        e.target.style.color = "purple"
    }

    function likeABook(e, book){
        e.target.innerText = "You've Liked This Book!"
        bookUsers = book.users
        bookUsers.push({"id":1, "username":"pouros"})
        userBody = {users : bookUsers}

        const configObject = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(userBody)
        }
        return fetch(`${baseURI}/${book.id}`, configObject)
        .then(function(response){
            return response.json()
        })
    }

getBooks()
})