//Had an online friend with experience in coding explain certain elements to me.
//He watched along while I was coding and helped me make things more efficient (Ternary Operator & Immediately Invoked Function Expression)

//Used https://stackoverflow.com/questions/29884654/button-that-refreshes-the-page-on-click
//to remind me on how page refresh buttons work

console.log("HELP MEEEEE")

const kaarten = document.querySelectorAll('.kaartjes');

let heeftGeflipteKaart = false
let stopBord = false
let eersteKaart, tweedeKaart

function flipKaart() {
    if (stopBord) return
    if (this === eersteKaart) return

  this.classList.add('flip')

  if (!heeftGeflipteKaart) {
    //eerste klik
    heeftGeflipteKaart = true
    eersteKaart = this

    return
  } 
    //tweede klik
    tweedeKaart = this

    zoekNaarMatch()
  }

function zoekNaarMatch() {
    let isEenMatch = eersteKaart.dataset.framework ===
    tweedeKaart.dataset.framework

    //ternary operator - if else in 1 lijn
    isEenMatch ? stopKaarten() : resetKaarten()
}

function stopKaarten() {
    eersteKaart.removeEventListener('click', flipKaart)
    tweedeKaart.removeEventListener('click', flipKaart)

    resetBord()
}
function resetKaarten() {
    stopBord = true
    setTimeout(() => {
        eersteKaart.classList.remove('flip')
        tweedeKaart.classList.remove('flip')

        resetBord()
        stopBord = false
    }, 1500)
}

function resetBord() {
    [heeftGeflipteKaart, stopBord] = [false, false]
    [eersteKaart, tweedeKaart] = [null, null]
}

//"Immediately Invoked Function Expression" >> functie wordt meteen uitgevoerd
(function schudKaarten() {
    kaarten.forEach(kaart => {
        let randomPlek = Math.floor(Math.random() * 12)
        kaart.style.order = randomPlek
    })
})()

kaarten.forEach(kaart => kaart.addEventListener('click', flipKaart))

function reload() {
    const button = document.querySelector("button")
    button.addEventListener("click" , () => {
        window.location.reload()
    })
}
