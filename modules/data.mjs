import { page } from './page.mjs';
import { eventHandlers } from "./eventHandlers.mjs";

export const data = {
    getData: async function(jsonName) {
        try {
            let response = await fetch(jsonName);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    },

    
    loginAuthentication: async function() {
        let arrayUserObject = await data.getData('users.json');
        let userNameInput = document.getElementById("username").value;
        let passwordInput = document.getElementById("password").value;

        //Kollar ifall det finns en matchande användare
        let matchedUser = arrayUserObject.some(user => user.username == userNameInput && user.password == passwordInput);

        if(matchedUser){
            document.getElementById("wrapper").innerHTML = page.getBoardPage();
            eventHandlers.addOnAddCardBtnClickEventHandlers(); //Lägger till event handlers på alla "lägg till nytt kort"-knappar
        }

        // Måste meddela användaren att inloggningen misslyckades.
        else{
            console.log("Fel lösen/användarnamn!");
        }
    }
}