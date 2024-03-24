//Had an online friend with experience in coding explain certain elements to me.
//He watched along while I was coding and helped me make things more efficient (Ternary Operator & Immediately Invoked Function Expression)

//Used https://stackoverflow.com/questions/29884654/button-that-refreshes-the-page-on-click
//to remind me on how page refresh buttons work

//Used https://dev.to/shantanu_jana/how-to-play-sound-on-button-click-in-javascript-3m48#:~:text=addEventListener(%22click%22%2C%20(),JavaScript%20web%20elements%20for%20beginners.
//to find out how to add sound to click. (Extra research)

console.log("HELP MEEEEE")

document.querySelector("h1").textContent = "Memory Eindopdracht"
document.querySelector("button").textContent = "Reset"

const kaarten = document.querySelectorAll('.kaartjes');

const audioKlik = new Audio("https://www.fesliyanstudios.com/play-mp3/2882")
const audioWin  = new Audio("https://www.fesliyanstudios.com/play-mp3/2656")

let heeftGeflipteKaart = false
let eersteKaart, tweedeKaart
let teller= 12


function flipKaart() {
  this.classList.add('flip')

  if (!heeftGeflipteKaart) {
    //eerste klik
    heeftGeflipteKaart = true
    eersteKaart = this
  } else {
    //tweede klik
    tweedeKaart = this
  
    zoekNaarMatch()
  }
  }

function zoekNaarMatch() {
    let isEenMatch = eersteKaart.dataset.framework ===
    tweedeKaart.dataset.framework

    isEenMatch ? stopKaarten() : resetKaarten()
    //Ternary operator, if else in 1 lijn >> eerst je condition(is het een match?), daarna de statement voor als
    //de condition TRUE is (hou de kaarten vast), daarna de statement voor als de condition FALSE is (reset de kaarten).

    //Lang uitgeschreven >
    //if (){
        //stopKaarten()
        //} else {
        //resetKaarten()
        //}
    
}
//stopKaarten >> in geval van een match, kaarten draaien niet meer terug
function stopKaarten() {
    eersteKaart.removeEventListener('click', flipKaart)
    tweedeKaart.removeEventListener('click', flipKaart)

    teller = teller -=2
    if (teller == 0)audioWin.play()
    setTimeout(() => {
    if (teller == 0){alert('Je hebt gewonnen! Klik op "Reset" om nog een keer te gaan.')}
    }, 1000)
    resetBord()
}
//resetKaarten >> in geval van geen match, kaarten draaien beide terug na een korte tijd
function resetKaarten() {
    setTimeout(() => {
        eersteKaart.classList.remove('flip')
        tweedeKaart.classList.remove('flip')

        resetBord()
    }, 1500)
}

function resetBord() {
    [heeftGeflipteKaart] = false
    [eersteKaart, tweedeKaart] = [null, null]
}

//"Immediately Invoked Function Expression" >> functie wordt meteen uitgevoerd
//functie tussen haakjes zegt tegen javascript om deze als eerste te runnen
//daarna nog een () zodat de functie wordt uitgevoerd zodra de pagina laadt

(function schudKaarten() {
    kaarten.forEach(kaart => {
        let randomPlek = Math.floor(Math.random() * 12)
        kaart.style.order = randomPlek
    })
})()

kaarten.forEach(kaart => kaart.addEventListener('click', flipKaart))
kaarten.forEach(kaart => { kaart.addEventListener('click', () => {
    audioKlik.play()
    
})
})

function reload() {
    const button = document.querySelector("button")
    button.addEventListener("click" , () => {
        window.location.reload()
    })
}
