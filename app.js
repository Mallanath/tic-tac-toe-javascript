const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")

const startCell = [
    "", "", "", "", "", "", "", "", "",
]
let go = "circle"
infoDisplay.textContent = "circle go first"

function createBoard() {
    startCell.forEach((cell, index) => {
       const cellElement = document.createElement("div")
       cellElement.classList.add("square")
       cellElement.id = index
       cellElement.addEventListener("click", addGo)
       gameBoard.append(cellElement)
    })
}

createBoard()

function addGo(e) {
const goDisplay = document.createElement("div")
goDisplay.classList.add(go)
e.target.append(goDisplay)
go = go === "circle" ? "cross" : "circle"
infoDisplay.textContent = "it is now " + go + "s go."
e.target.removeEventListener('click', addGo)
checkScore()
}

function checkScore() {
    const allSquare = document.querySelectorAll(".square")
    winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquare[cell].firstChild?.classList.contains("circle"))

            if(circleWins) {
                infoDisplay.textContent = "circle wins!"
                allSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
                return
            }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            allSquare[cell].firstChild?.classList.contains("cross"))

            if(crossWins) {
                infoDisplay.textContent = "cross wins!"
                allSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
                return
            }
    })
}