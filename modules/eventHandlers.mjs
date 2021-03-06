/* 

Här finns alla funktioner som:

1. Lägger till event handlers till element.
2. Är event handlers.

/Anthon

*/

import { page } from './page.mjs';
import { data } from './data.mjs';

export const eventHandlers = {
    addOnAddCardBtnClickEventHandlers: function () {
        console.log("add card");
        const addCardBtns = document.getElementsByClassName("add-card-button");
        Object.keys(addCardBtns).forEach(key => {
            addCardBtns[key].addEventListener("click", e => eventHandlers.onAddCardClickEventHandler(e))
            //     console.log(addCardBtns[key]);
        });
    },
    addOnDeleteCardClickEventHandler: function (button) {
        button.addEventListener("click", e => eventHandlers.onDeleteCardClickEventHandler(e))
    },
    onAddCardClickEventHandler: function (e) {
        page.addCard(e);
    },
    onDeleteCardClickEventHandler: function (e) {
        page.deleteCard(e);
        data.deleteCardFromLocalStorage(e);
    },
    addEditCardClickEventHandlers: function () {
        const editCardsButtons = document.getElementsByClassName("edit-card-button");
        Object.keys(editCardsButtons).forEach(key => {
            editCardsButtons[key].addEventListener("click", e => eventHandlers.onEditCardClickEventHandler(e))
        });
    },
    addEditCardEventHandler: function (button) {
        button.addEventListener("click", e => eventHandlers.onEditCardClickEventHandler(e));
    },
    onEditCardClickEventHandler: function (e) {
        page.editCard(e);
    },
    addEditColumnNameEventHandlers: function () {
        const addCardBtns = document.getElementsByClassName("edit-column-button");
        Object.keys(addCardBtns).forEach(key => {
            addCardBtns[key].addEventListener("click", e => eventHandlers.onEditColumnNameEventHandler(e))
        });
    },
    onEditColumnNameEventHandler: function (e) {
        page.editColumnName(e);
    },
    addOnLoginBtnClickEventHandler: function () {
        const loginBtn = document.getElementById("login-button");

        loginBtn.addEventListener("click", () => {
            data.loginAuthentication();
        })
    },
    addOnLogoutBtnClickEventHandlers: function () {
        const logoutBtn = document.getElementById("logout-button");

        logoutBtn.addEventListener("click", () => {
            data.logoutUsers();
        });
    }
}





//förlegad kod

// onSaveCardButtonClicked: function (e) {
    //     const columns = data.getColumnNames();
    //     console.log("1",columns);
    //     const cards = data.getCardsFromColumns(columns);
    //     console.log("2", cards);
    //     data.saveCardsToLocalStorage(cards); 

    // },