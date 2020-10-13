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
            <div class="button-keeper"><button id="logout-button">Logga ut</button></div>
        </div>
    </header>
    <main>
        <div class="main">
            <div class="column-container">
                <div id="todo-column" class="column">
                    <header class="column-header">
                        <h3>Todo</h3>
                    </header>
                    <div class="enter-card">
                        <button class="add-card-button">+ Lägg till ett kort</button>
                    </div>
                </div>
                <div id="doing-column" class="column">
                    <header class="column-header">
                        <h3>Doing</h3>
                    </header>
                    <div class="enter-card">
                        <button class="add-card-button">+ Lägg till ett kort</button>
                    </div>
                </div>
                <div id="test-column" class="column">
                    <header class="column-header">
                        <h3>Test</h3>
                    </header>
                    <div class="enter-card">
                        <button class="add-card-button">+ Lägg till ett kort</button>
                    </div>
                   
                </div>
                <div id="done-column" class="column">
                    <header class="column-header">
                        <h3>Done</h3>
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
        const card = document.createElement("div");
        card.setAttribute("class", "card");

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
        Nytt kort. ID: ${new Date().getTime()}
        `;
        card.append(button, par, editButton);
        e.target.parentNode.append(card);
    },
    deleteCard: function(e) {
        e.target.parentNode.remove();
    },
    editCard: function(e)
    {
        if(page.cardIsBeingEdited == false)
        {
            e.target.style.display = "none";
            let parentText = e.target.parentNode.getElementsByClassName("card-description")[0];
            parentText.contentEditable = true;
            let btn = document.createElement("button");
            btn.setAttribute("class", "edit-done-button");
            btn.innerHTML = "Done";
            e.target.parentNode.append(btn);
            parentText.focus();
            btn.addEventListener("click", function()
            {
                parentText.contentEditable = false;
                e.target.parentNode.removeChild(btn);
                e.target.style.display = "block";
                page.cardIsBeingEdited = false;
            });
            page.cardIsBeingEdited = true;
        }
    },
    cardIsBeingEdited: new Boolean(false)
}