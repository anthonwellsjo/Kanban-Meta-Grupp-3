import { eventHandlers } from "./eventHandlers.mjs";

export const page = {
    getFrontPage: function () {
        return `
        <header class="page-header">
        <div class="logo-keeeper"><h2 class="logotext">Kanban bräda</h2></div>
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
        <div class="logo-keeeper">
            <h2 class="logotext">Kanban bräda</h2>
        </div>
    </header>
    <main>
        <div class="main">
            <div class="flex-container float-left">
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

       // child.getElementsByClassName("edit-card-button")[0].addEventListener("click", e => eventHandlers.onEditCardClickEventHandler(e));

    },
    deleteCard: function(e) {
        e.target.parentNode.remove();
    }

}