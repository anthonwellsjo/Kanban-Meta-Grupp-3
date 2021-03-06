import { data } from "./data.mjs";
import { eventHandlers } from "./eventHandlers.mjs";
//#region drag & drop handlers
window.allowDrop = function(e) { //Visar vart man kan droppa kortet
    e.preventDefault();
  }

 window.drag = function(e) { //Hanterar vad som händer när man drar runt kortet
    const allCards = document.querySelectorAll('.card');


    allCards.forEach(card => {
        const dropZoneDiv = document.createElement("div");
        //Sätter in rel. attribute för att kunna droppa element i dropZone
        page.setMultipleAttributes(dropZoneDiv, { ondrop: "drop(event)", ondragover: "allowDrop(event)", class:"dropZoneDiv"}); 
        //Stoppa in ny skapade drop zoner ovanför alla existerande kort
        card.parentNode.insertBefore(dropZoneDiv,card); 
    })
    e.dataTransfer.setData("div", e.target.getAttribute("card-id")); //sparar kortet som man drar
  }
 window.drop = function(e) { //hanterar vad som sker när man sätter ner kortet
    e.preventDefault();
    console.log(e.target);
    const allDropZones = document.querySelectorAll('.dropZoneDiv'); //Hämtar alla drop zoner som skapades under drag event.
    const droppedCard = e.dataTransfer.getData("div"); //hämtar kortet man drog
    const divContainer = e.target;
    //Tillåter endast droppa inutti column eller dropZoneDiv
    if(divContainer.className == "column" || divContainer.className == "dropZoneDiv" ){
        console.log((document.querySelector(`div[card-id="${droppedCard}"]`)));
        e.target.appendChild(document.querySelector(`div[card-id="${droppedCard}"]`));
    }

    //Tar bort alla drop zoner om de inte innehåller ett kort.
    allDropZones.forEach(e => { 
        if(e.childElementCount == 0){
            e.remove()
        }})
  }
//#endregion

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
            <div class="main start">
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
            <div class="scrollbar">
                <div class="column-container">
                    <div id="todo-column" class="column" ondrop="drop(event)" ondragover="allowDrop(event)">
                        <header class="column-header">
                            <h3 class="column-name">Todo</h3>
                            <button class="edit-column-button">Edit</button>
                        </header>
                        <div class="enter-card">
                            <button class="add-card-button">+ Lägg till ett kort</button>
                        </div>
                    </div>
                    <div id="doing-column" class="column" ondrop="drop(event)" ondragover="allowDrop(event)">
                        <header class="column-header">
                            <h3 class="column-name">Doing</h3>
                            <button class="edit-column-button">Edit</button>
                        </header>
                        <div class="enter-card">
                            <button class="add-card-button">+ Lägg till ett kort</button>
                        </div>
                    </div>
                    <div id="test-column" class="column" ondrop="drop(event)" ondragover="allowDrop(event)">
                        <header class="column-header">
                            <h3 class="column-name">Test</h3>
                            <button class="edit-column-button">Edit</button>
                        </header>
                        <div class="enter-card">
                            <button class="add-card-button">+ Lägg till ett kort</button>
                        </div>
                    
                    </div>
                    <div id="done-column" class="column" ondrop="drop(event)" ondragover="allowDrop(event)">
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
        </div>
    </main>
    <footer class="footer">
    </footer>
`
    },
    addCard: function (e) {
        page.creatingNewCard = true;
        if (page.editing == false) {
            //Skapa kort
            const card = document.createElement("div");
            this.setMultipleAttributes(card,{class:"card",draggable:"true",ondragstart:"drag(event)"});
            card.setAttribute("card-id", `${new Date().getTime()}`) //kortet får ett unikt attribut så att vi inte skapar dubbletter.

            //Skapa edit, delete knapp på kortet och paragraf.
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
            
            //Vid kort skapande, vill vi hamna i samma läge som när man trycker på edit knappen på en existerande kort.
            editButton.click();
        }
    },
    renderBoardFromSavedCards: function (board) {
        //tar inga argument... jämför cardsOrder-objektet med board-objektet och renderar board page i rätt ordning
        const boardColumnsElements = document.getElementsByClassName("column");
        const cardsOrder = data.getCardsOrderFromLocalStorage();
        if (board) {
            Object.keys(cardsOrder).forEach(column => {
                Object.keys(cardsOrder[column]).forEach(index => {
                    Object.keys(board).forEach(k => {
                        if (board[k].id === cardsOrder[column][index]["cardId"]) {
                            const [cardElement, column, id] = this.createCardFromSaved(board[k]);
                            this.addCardToBoardFromSaved(cardElement, column, id, boardColumnsElements);
                        }
                    })
                })
            })
        }
    },
    createCardFromSaved: function (card) {
        const element = document.createElement("div");

        this.setMultipleAttributes(element,{class:"card",draggable:"true",ondragstart:"drag(event)"})
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
        par.innerText = `${card.description}`;
        element.append(button, par, editButton);
        return [element, card.column, card.id];
    },
    addCardToBoardFromSaved: function (cardElement, column, id, boardColumnElements) {
        Object.keys(boardColumnElements).forEach(k => {
            if (column === boardColumnElements[k].children[0].children[0].innerText) {
                boardColumnElements[k].getElementsByClassName("enter-card")[0].append(cardElement);
            }
        })
    },
    deleteCard: function (e) {
        if (page.editing) {
            let editOverlay = document.getElementById("editOverlay") != null ?  document.getElementById("editOverlay") : e.target.parentNode;
            editOverlay.remove();
        }
        e.target.parentNode.remove();
        page.editing = false;

    },
    editCard: function (e) {
        if (page.editing == false) {
            e.target.style.display = "none";
            let parentText = e.target.parentNode.getElementsByClassName("card-description")[0];
            parentText.contentEditable = true;
            parentText.focus();
           
            let oldIndex = e.target.parentNode.style.zIndex;
            e.target.parentNode.style.zIndex = '11';
            
            let editOverlay = document.createElement("div");
            editOverlay.setAttribute("id", "editOverlay");

            e.target.parentNode.parentNode.append(editOverlay);
            editOverlay.addEventListener("click", function () {
                saveCard();
            });
           
            let btn = document.createElement("button");
            btn.setAttribute("class", "edit-done-button");
            btn.innerHTML = "Save";
            e.target.parentNode.append(btn);
            btn.addEventListener("click", function () {
                saveCard();
            });
           
            let saveCard = function(){
                parentText.contentEditable = false;
                e.target.parentNode.removeChild(btn);
                e.target.style.display = "block";
                data.saveCardToLocalStorage(e.target.parentNode);
                data.saveCardsOrderToLocalStorage();
                page.editing = false;
                e.target.parentNode.style.zIndex = oldIndex;
                editOverlay.remove();
            }
            page.editing = true;
        }
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
            page.editing = true;
            btn.addEventListener("click", function () {
                parentText.contentEditable = false;
                e.target.parentNode.removeChild(btn);
                e.target.style.display = "block";
                page.editing = false;
            });

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
    setMultipleAttributes: function(element,attributes) { //hjälp funktion för att sätta flera attribut på samma gång
        Object.keys(attributes).forEach(key=> element.setAttribute(key,attributes[key]));
    },
    creatingNewCard: false,
    editing: new Boolean(false),
}
