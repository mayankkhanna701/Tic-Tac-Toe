let board = ["","","","","","","","",""];
const winningpattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
turnO= true;
let boxes= document.querySelectorAll(".btn");
let statuschange= document.getElementById("heading");
let gameover=false;
boxes.forEach((btn,index) => {
    btn.addEventListener("click", () =>{
    if(turnO===true){
        console.log("Clicked");
        btn.innerText="O";
        board[index]="O";
        console.log(board[index]);
        turnO=false;
        btn.disabled = true;
    }
    if(!checkwinner()){
        setTimeout(()=>{
            compmove();
            checkwinner();
        },100);
        turnO=true;
    }
})
});
function resetgame(){
    board=["","","","","","","","",""]
    boxes.forEach(btn =>{
        btn.innerText="";
        btn.disabled=false;
        statuschange.innerText="Start By Clicking on any of the Boxes";
        turnO=true;        
    });
    console.log("Reset");
}
let reset=document.querySelector(".reset");
reset.addEventListener("click", resetgame);
function checkwinner(){
    for(pattern of winningpattern){
        let [a,b,c]=pattern;
        if(board[a]!==""&& board[a]===board[b]&& board[a]===board[c]){
            if(board[a]==="X"){
                statuschange.innerText = "Computer Wins!!";
            }
            if(board[a]==="O"){
                statuschange.innerText = "You Win!!";
            }
            setTimeout(() =>{
                reset.addEventListener("click",resetgame);
            }, 100)
            return true;
        }
    }
    if(!board.includes("")){
        statuschange.innerText = "Draw!";
        setTimeout(()=>{
            reset.addEventListener("click",resetgame);
        },100)
        return true;
    }
    return false;
}
function compmove(){
    for(let [a,b,c] of winningpattern){
    //winning
    if(board[a]==="X"&& board[b]==="X" && board[c]===""){
        makemove(c);
        return;
    }
    if(board[a]==="X"&& board[c]==="X" && board[b]===""){
        makemove(b);
        return;
    }
    if(board[b]==="X"&& board[c]==="X" && board[a]===""){
        makemove(a);
        return;
    }
}
    //blocking
    for(let [a,b,c] of winningpattern){    
    if(board[a]==="O" && board[b]==="O" && board[c]===""){
        makemove(c);
        return;
    }
    if(board[a]==="O" && board[c]==="O" && board[b]===""){
        makemove(b);
        return;
    }
    if(board[b]==="O"&& board[c]==="O" && board[a]===""){
        makemove(a);
        return;
    }
    }
    //taking center
    if(board[4]===""){
        makemove(4);
        return;
    }
    //taking sides
    for(let i of [0,2,3,5,6,8]){
        if(board[i]===""){
            makemove(i);
            return;
        }
    }
}
function makemove(i){
    board[i]="X";
    boxes[i].innerText="X";
    boxes[i].disabled= true;
}