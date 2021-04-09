const cellElements =document.querySelectorAll("[data-cell]")
const CIRCLE_CLASS ='o'
const X_CLASS ='x'
const borad = document.getElementById('board')
let circleTurn
const winnigMessageELement = document.getElementById('winningMessage')
const winningText = document.querySelector('[data-winnig-message-text]')
const WinningCombinations =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const restartButton=document.getElementById('restartButton')

startgame()
restartButton.addEventListener('click',startgame)
function startgame() {
cellElements.forEach(cell =>{
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    
    cell.addEventListener('click',handleClick,{once:true})

})
selectBoardHover()
winnigMessageELement.classList.remove('show')
}
function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        console.log('wun')
        endgame(false)
        

    }else if (isDraw()){
        endgame(true)
    }
    swapTurns()
    selectBoardHover()
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    circleTurn=!circleTurn
}
function selectBoardHover(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);;
    if(circleTurn){
        borad.classList.add(CIRCLE_CLASS)

    } else{
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass) {
    return WinningCombinations.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
    
}
function endgame(draw){
    if (draw){
        winningText.innerHTML='Draw!'

    }else{
        winningText.innerText= `${circleTurn ? "O's":"X's" } Wins!`
    }
    winnigMessageELement.classList.add('show')
}
function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
    })
}