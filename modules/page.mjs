import { data } from "./data.mjs";
import { eventHandlers } from "./eventHandlers.mjs";

export const page = {
    getFrontPage: function () {
        return `
        <header class="page-header">
            <div class="flex-container">
                <div class="empty-keeper"></div>
                <div class="logo-keeper"><h2 class="logotext">Kanban bräda</h2></div>
                <div class="button-keeper"></div>
            </div>
        </header>
        <main>
            <div class="main">
                <div class="login-container">
                    <header>
                        <h1>Logga in</h1>
                    </header>
                        <div id="error-message"></div>
                        <label for="username">Användarnamn: </label>
                        <input id="username" name="username" type="text" placeholder="Användarnamn">
                        <label for="username">Lösenord: </label>
                        <input id="password" name="password" type="password" placeholder="Lösenord">
                        <button id="login-button">Logga in</button> 
                </div>
            </div>    
        </main>
   <footer class="footer"></footer>
   `
    },
    getBoardPage: function () {
        return `
    <header class="page-header">
        <div class="flex-container">
            <div class="empty-keeper"></div>
            <div class="logo-keeper"><h2 class="logotext">Kanban bräda</h2></div>
            <div class="button-keeper"><button class="header-button" id="logout-button">Logga ut</button></div>
        </div>
    </header>
    <main>
        <div class="main">
            <div class="column-container">
                <div id="todo-column" class="column">
                    <header class="column-header">
                        <h3 class="column-name">Todo</h3>
                        <button class="edit-column-button">Edit</button>
                    </header>
                    <div class="enter-card">
                        <button class="add-card-button">+ Lägg till ett kort</button>
                    </div>
                </div>
                <div id="doing-column" class="column">
                    <header class="column-header">
                        <h3 class="column-name">Doing</h3>
                        <button class="edit-column-button">Edit</button>
                    </header>
                    <div class="enter-card">
                        <button class="add-card-button">+ Lägg till ett kort</button>
                    </div>
                </div>
                <div id="test-column" class="column">
                    <header class="column-header">
                        <h3 class="column-name">Test</h3>
                        <button class="edit-column-button">Edit</button>
                    </header>
                    <div class="enter-card">
                        <button class="add-card-button">+ Lägg till ett kort</button>
                    </div>
                   
                </div>
                <div id="done-column" class="column">
                    <header class="column-header">
                        <h3 class="column-name">Done</h3>
                        <button class="edit-column-button">Edit</button>
                    </header>
                    <div class="enter-card">
                        <button class="add-card-button">+ Lägg till ett kort</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer class="footer">
    </footer>
`
    },
    addCard: function (e) {
        page.creatingNewCard = true;
        if (page.editing == false) {

            const card = document.createElement("div");
            card.setAttribute("class", "card");

            card.setAttribute("card-id", `${new Date().getTime()}`) //kortet får ett unikt attribut så att vi inte skapar dubbletter.

            const button = document.createElement("button");
            button.setAttribute("class", "delete-card-btn");
            button.innerText = "X";
            eventHandlers.addOnDeleteCardClickEventHandler(button);

            const editButton = document.createElement("button");
            editButton.setAttribute("class", "edit-card-button");
            editButton.innerText = "Edit";
            eventHandlers.addEditCardEventHandler(editButton);

            const par = document.createElement("p");
            par.setAttribute("class", "card-description");
            par.innerText = ``;
            card.append(button, par, editButton);
            e.target.parentNode.insertBefore(card, e.target.parentNode.childNodes[2]);
            editButton.click();
        }
    },
    createCardFromSaved: function (card) {
        const element = document.createElement("div");
        element.setAttribute("class", "card");

        element.setAttribute("card-id", `${card.id}`);

        const button = document.createElement("button");
        button.setAttribute("class", "delete-card-btn");
        button.innerText = "X";
        eventHandlers.addOnDeleteCardClickEventHandler(button);

        const editButton = document.createElement("button");
        editButton.setAttribute("class", "edit-card-button");
        editButton.innerText = "Edit";
        eventHandlers.addEditCardEventHandler(editButton);

        const par = document.createElement("p");
        par.setAttribute("class", "card-description");
        par.innerText = `
        ${card.description}
        `;
        element.append(button, par, editButton);
        return [element, card.column, card.id];
    },
    addCardToBoardFromSaved: function (cardElement, column, id, boardColumnElements) {
        Object.keys(boardColumnElements).forEach(k => {
            if (column === boardColumnElements[k].children[0].children[0].innerText) {
                boardColumnElements[k].append(cardElement);
            }


        })
    },
    deleteCard: function (e) {
        e.target.parentNode.remove();
        page.editing = false;
        window.removeEventListener('click', page.clickOutsideCardSaveEvent);
    },
    editCard: function (e) {
        if (page.editing == false) {
            e.target.style.display = "none";
            let parentText = e.target.parentNode.getElementsByClassName("card-description")[0];
            parentText.contentEditable = true;
            let btn = document.createElement("button");
            btn.setAttribute("class", "edit-done-button");
            btn.innerHTML = "Save";
            e.target.parentNode.append(btn);
            parentText.focus();
            let saved = false;
            btn.addEventListener("click", function () {
                saved = true;
                page.saveCard(e, btn);
            });
            page.editing = true;
            window.addEventListener('click',  ev => page.clickOutsideCardSaveEvent(ev));   /*
                if (!e.target.parentNode.contains(ev.target) && saved != true && !e.target.parentNode.parentNode.getElementsByClassName("add-card-button")[0].contains(ev.target)){
                    page.saveCard(e, btn);
                    window.removeEventListener('click', clickOutsideCardSaveEvent);
                }
            });*/
        }
    },
    clickOutsideCardSaveEvent: function(ev){
        console.log("utanför");/*
        if (!e.target.parentNode.contains(ev.target) && saved != true && !e.target.parentNode.parentNode.getElementsByClassName("add-card-button")[0].contains(ev.target)){
            page.saveCard(e, btn);
        }*/
    },
    saveCard: function(e, btn){
        e.target.parentNode.getElementsByClassName("card-description")[0].contentEditable = false;
        e.target.parentNode.removeChild(btn);
        e.target.style.display = "block";
        page.editing = false;
        data.saveCardToLocalStorage(e.target.parentNode);
        window.removeEventListener('click', page.clickOutsideCardSaveEvent, true);
        console.log("Nu borde den vara borta");
    },
    editColumnName: function (e) {
        if (page.editing == false) {
            e.target.style.display = "none";
            let parentText = e.target.parentNode.getElementsByClassName("column-name")[0];
            parentText.contentEditable = true;
            let btn = document.createElement("button");
            btn.setAttribute("class", "column-edit-done-button");
            btn.innerHTML = "Save";
            e.target.parentNode.append(btn);
            parentText.focus();
            btn.addEventListener("click", function () {
                parentText.contentEditable = false;
                e.target.parentNode.removeChild(btn);
                e.target.style.display = "block";
                page.editing = false;
            });
            page.editing = true;
        }
    },
    loadLoginPage: function () {
        document.getElementById("wrapper").innerHTML = page.getFrontPage();
        eventHandlers.addOnLoginBtnClickEventHandler();
    },
    loadBoardPage: function () {
        document.getElementById("wrapper").innerHTML = page.getBoardPage();
        eventHandlers.addOnAddCardBtnClickEventHandlers(); //Lägger till event handlers på alla "lägg till nytt kort"-knappar
        eventHandlers.addEditColumnNameEventHandlers();
        page.renderBoardFromSavedCards(data.getCardsFromLocalStorage());
        eventHandlers.addOnLogoutBtnClickEventHandlers();
    },
    renderBoardFromSavedCards: function (board) {
        const boardColumnsElements = document.getElementsByClassName("column");
        console.log("boardColumnsElements", boardColumnsElements)
        if (board) {
            Object.keys(board).forEach(k => {
                const [cardElement, column, id] = this.createCardFromSaved(board[k]);
                this.addCardToBoardFromSaved(cardElement, column, id, boardColumnsElements);
            })
        }
    },
    creatingNewCard: false,
    editing: new Boolean(false),

}