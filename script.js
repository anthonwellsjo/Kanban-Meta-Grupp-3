import { page } from './modules/page.mjs';
import { data } from './modules/data.mjs';
import { eventHandlers } from './modules/eventHandlers.mjs';
document.body.onload = script;

let userIsLoggedIn = localStorage.getItem("currentUser") != null ? true : false;  //false => loginPage  //true => boardPage

function script() {
    if(userIsLoggedIn){
        page.loadBoardPage();
    } else{
        page.loadLoginPage();
    }

                             //Lägger till event handler till "Logga in"-knappen.
    //document.getElementById("wrapper").innerHTML = page.getBoardPage();
    //eventHandlers.addOnAddCardBtnClickEventHandlers();                          //Lägger till event handlers på alla "lägg till nytt kort"-knappar.
}
