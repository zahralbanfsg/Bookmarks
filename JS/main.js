"use strict"
let siteName = document.querySelector("#siteName");
let siteUrl = document.querySelector("#siteUrl");
let btnSubmit = document.querySelector("#btnSubmit");
let errorInput = document.querySelector("#error");
let btnError = document.querySelector("#btnError");
let dialog = document.querySelector(".dialog");
let bookmarks = [];

if (localStorage.getItem("bookmarkList") !== null) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarkList"));
    displayBookmark(bookmarks);
};

btnSubmit.addEventListener("click", validationOnSubmit);
function validationOnSubmit() {
    if (validationSiteName() === true && validationSiteUrl() === true && checkDataRepeated() === true) {
        let bookmark = {
            name: siteName.value,
            url: siteUrl.value,
        }
        bookmarks.push(bookmark);
        setProductsInLocalStorage(bookmarks);
        displayBookmark(bookmarks);
        clearValues();
        siteUrl.classList.remove("is-valid");
        siteName.classList.remove("is-valid");
    }
    else {
        errorInput.classList.replace("d-none", "d-block");
        dialog.classList.replace("d-none", "d-block");
    }
}


btnError.addEventListener("click", function () {
    errorInput.classList.replace("d-block", "d-none");
})


function setProductsInLocalStorage(bookmarks) {
    window.localStorage.setItem("bookmarkList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks);
}

function clearValues() {
    siteName.value = "";
    siteUrl.value = "";
}
function displayBookmark(bookmarks) {
    let list = "";
    for (let i = 0; i < bookmarks.length; i++) {
        list += ` <tr>
        <td>${i + 1}</td>
        <td class="text-capitalize">${bookmarks[i].name}</td>
        <td><button class="btn btnVisit" onclick="visitUrl(${i})"> 
        <i class="fa-solid fa-eye pe-1"></i>
        Visit</button></td>
        <td><button class="btn btnDelete" onclick="deleteRow(${i})"> 
        <i class="fa-solid fa-trash-can pe-1"></i>
        Delete</button></td>
    </tr>`
    }
    document.getElementById("list").innerHTML = list;
}

function deleteRow(index) {
    bookmarks.splice(index, 1);
    setProductsInLocalStorage(bookmarks);
    displayBookmark(bookmarks);
}

function visitUrl(index) {
    open(bookmarks[index].url);
}

// ************** V A L I D A T I O N **************
siteName.addEventListener("input", validationSiteName);
function validationSiteName() {
    var regex = /^\w{3,}$/;
    if (regex.test(siteName.value) === true) {
        siteName.classList.replace("is-invalid", "is-valid");
        return true;
    } else {
        siteName.classList.add("is-invalid");
        return false;
    }
}

siteUrl.addEventListener("input", validationSiteUrl)
function validationSiteUrl() {
    var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gmi;
    if (regex.test(siteUrl.value) !== true) {
        siteUrl.classList.add("is-invalid");
        return false;
    } else {
        siteUrl.classList.replace("is-invalid", "is-valid");
        return true;
    }
}

function checkDataRepeated() {
    let checkSiteValues = true;
    for (let i = 0; i < bookmarks.length; i++) {
        if (siteName.value == bookmarks[i].name || siteUrl.value == bookmarks[i].url) {
            checkSiteValues = false;
            console.log(checkSiteValues)
            break
        }
    }
    if (checkSiteValues == false) {
        return false
    } else {
        return true
    }
}


