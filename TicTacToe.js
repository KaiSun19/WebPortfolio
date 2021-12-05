/*


*/

let circleTurn;

const cellList = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".board");
const winningMessage = document.querySelector(".winningMessage");
const winningText = document.querySelector("[data-winningText")
const restartButton = document.querySelector("#restartButton")
const mode = document.querySelector(".mode")
const toggle = document.querySelector(".toggle")

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove("x")
    board.classList.remove("o")
    if(circleTurn){
        board.classList.add("x");
    }
    else if(!circleTurn){
        board.classList.add("o");
    }
}

function setInitialClass(){
    cellList.forEach(cell => { 
        if(cell.classList.contains("x") || cell.classList.contains("o")){
            return;
        }
        else{
            circleTurn = circleTurn
        }
    });
    board.classList.add("x")

}

function getCurrentMark(){
    if(circleTurn == true){
        return "x"
    }
    else{
        return "o"
    }
}

function checkWin(){
    let currentMark = getCurrentMark();
    return winningCombinations.some( combination =>{
        return combination.every(index =>{
            return cellList[index].classList.contains(currentMark)
        })
    })
}

function placeMark(event){
    let cell = event.target;
    if(circleTurn){
        cell.classList.add("o");
    }
    else if(!circleTurn){
        cell.classList.add("x");
    }
}

function checkDraw(){
    return [...cellList].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("o")
    })
}

function handleListener(event){
    setBoardHoverClass()
    placeMark(event)
    swapTurns()
    let result = checkWin()
    if(result == true){
        circleTurn = !circleTurn
        if(circleTurn == true){
            winningPlayer = "Circle"
        }
        else if(circleTurn == false){
            winningPlayer = "Cross"
        }
        winningText.innerHTML = winningPlayer + " Wins !"
        winningMessage.style.display = "flex"
    }
    else{
        let seeCheck = checkDraw()
        if(seeCheck == true){
            winningText.innerHTML = "Draw!"
            winningMessage.style.display = "flex"
        }
    }

}

setInitialClass()

function playGame(){
    cellList.forEach(cell => {
        cell.addEventListener("click",handleListener, {once:true})
    });
}

playGame()

function resetGame(){
    winningMessage.style.display = "none"
    cellList.forEach(cell => cell.classList.remove("x"))
    cellList.forEach(cell => cell.classList.remove("o"))
    //cellList.forEach(cell => cell.removeEventListener("click",))
    circleTurn = true;
    setBoardHoverClass()
    swapTurns()
    playGame()
}

restartButton.addEventListener("click",resetGame)

mode.addEventListener("click",function(e){
    if(mode.classList.contains("active")){
        mode.querySelector("input[type=checkbox]").checked = false;
        mode.classList.remove("active");
    }
    else {
        mode.classList.add("active");
        mode.querySelector("input[type=checkbox]").checked = true;
    }
});

function getEmptyCells(){
    emptyCells = []
    for(i = 0 ; i < cellList.length ; i++){
        if(cellList[i].classList.contains("x") == false && cellList[i].classList.contains("o") == false){
            emptyCells.push(i)
        }
    }
    return emptyCells;
}


function toggleMode(){
    if(mode.classList.contains("active") && checkDraw() == false){
        let emptyArray = getEmptyCells()
        let randomNumber = Math.floor(Math.random() * emptyArray.length)
        let EmptyCell = cellList[emptyArray[randomNumber]]
        if(circleTurn){
            EmptyCell.classList.add("o");
        }
        else if(!circleTurn){
            EmptyCell.classList.add("x");
        }
        setBoardHoverClass()
        swapTurns()
        let result = checkWin()
        if(result == true){
            circleTurn = !circleTurn
            if(circleTurn == true){
                winningPlayer = "Circle"
            }
            else if(circleTurn == false){
                winningPlayer = "Cross"
            }
            winningText.innerHTML = winningPlayer + " Wins !"
            winningMessage.style.display = "flex"
        }
        else{
            let seeCheck = checkDraw()
            if(seeCheck == true){
                winningText.innerHTML = "Draw!"
                winningMessage.style.display = "flex"
            }
        }
    
    }
}

cellList.forEach(cell =>{
    cell.addEventListener("click",() =>setTimeout(toggleMode,1000))
})