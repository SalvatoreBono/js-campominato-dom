"use strict"

/* Consegna
L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
 */
const btnGeneratorInput = document.getElementById("generator");
const containerFlowers = document.querySelector(".container-flowers");
const numberBlockGeneratorInput = document.getElementById("number-block");
//L’utente clicca su un bottone
const bombGenerator = [];
btnGeneratorInput.addEventListener("click", function () {
    containerFlowers.style.zIndex = 0;
    let sumPoints = 0;
    //Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
    const numberBlockGenerator = numberBlockGeneratorInput.value;

    //Math.sqrt calcola la radice
    //in questo caso Math.sqrt calcola la radice del numero che metti nella select
    const BlockGenerator = Math.sqrt(numberBlockGenerator);

    //Al click del btn aggiungi quello che viene dopo
    containerFlowers.innerHTML = "";

    containerFlowers.classList.add("d-flex");
    //Ogni cella ha un numero progressivo, dato dalla select "numberBlockGenerator".
    for (let i = 1; i <= numberBlockGenerator; i++) {

        const boxFlowers = creatorBlock(i, BlockGenerator);
        //collegare i div creati virtualmente
        containerFlowers.append(boxFlowers);

        boxFlowers.addEventListener("click", function () {
            //se attributo boxFlowers.dataset.click === "selezionato", "return" quindi bloccati e non vedere quello che c'è dopo
            if (boxFlowers.dataset.click === "selezionato") {
                return;
            }
            boxFlowers.dataset.click = "selezionato";
            //Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro
            boxFlowers.classList.toggle("bg-primary");

            // emetto un messaggio in console con il numero della cella cliccata.
            console.log(i);
            //Se i numeri di bombGenerator sono presenti nelle "i"  colorali di rosso
            if (bombGenerator.indexOf(i) >= 0) {
                boxFlowers.classList.toggle("bg-danger");
                console.log("Hai perso")
                alert("Hai Perso!")
                alert(`Punteggio Totale: ${sumPoints}`)

                //Bonus
                //return così che quando faccio il click a una bomba si ferma e non va a sommare i punti
                containerFlowers.style.zIndex = -1
                return;
            }

            //Somma punti al click
            boxFlowers.dataset.points = 1;
            sumPoints += parseInt(boxFlowers.dataset.points);
            console.log(`Punti: ${sumPoints}`)
            if (sumPoints === numberBlockGenerator - 16) {
                console.log("Hai Vinto")
                containerFlowers.style.zIndex = -1;

                alert("Hai Vinto!")
                alert(`Punteggio Totale: ${sumPoints}`)
            }
        })
    }
    /* Il computer deve generare 16 numeri casuali.  */
    randomBomb(bombGenerator, numberBlockGenerator)
})

function creatorBlock(i, BlockGenerator) {
    //genererà i div virtuali.
    const boxFlowers = document.createElement("div");

    //viene data la classe creata nel css
    boxFlowers.classList.add("box-flowers");

    //stampa nel boxFlowers tutte le "i" che sono tutti i numeri
    boxFlowers.innerHTML = i.toString();

    //al boxFlowers dare un flex basiss con un "calc 100% / la radice dei numeri generati"
    boxFlowers.style.flexBasis = `calc(100% / ${BlockGenerator})`;
    return boxFlowers;
}

function randomBomb(bombGenerator, numberBlockGenerator) {
    for (let i = 1; i <= 16; i++) {
        const bomb = Math.floor(Math.random() * numberBlockGenerator) + 1;
        //bombGenerator è un'array  vuota.".indexof" deve controllare i numeri non presenti quindi -1, e quindi pusha i numeri "bomb" non presenti.
        if (bombGenerator.indexOf(bomb) === -1) {
            bombGenerator.push(bomb)
            //"i--" serve mentre per far continuare il ciclo se non vengono trovati numeri non trovati
        } else {
            i--
        }
    }
    console.log(bombGenerator)
}