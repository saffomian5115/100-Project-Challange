let boxes = document.querySelectorAll(".box");
let btnNew = document.querySelector("#btnNew");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let btnReset = document.querySelector("#btnReset");

let player=true;
const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(player){
            box.innerText = "O";
            player = false;
        }
        else {
            box.innerText = "X";
            player = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const reset = () => {
    player= true;
    enableBoxes();
    msgContainer.classList.add("hide");
};



const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText= "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations\n Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPattern){
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;
        
        if(position1 != "" && position2 != "" && position3 != ""){
            if(position1 === position2 && position2 === position3){
                console.log("winner", position1);
                showWinner(position1);
            }
        }
    }
};


//   Change color button

const colors = ["#0ff", "#00ff00", "#f0f", "#ff4500", "#ffcc00", "#8a2be2"]; 
let index = 0;

document.getElementById("changeColor").addEventListener("click", function() {
    index = (index + 1) % colors.length; 
    document.documentElement.style.setProperty("--neon", colors[index]);
});

//  reset the game button

btnNew.addEventListener("click", reset);
btnReset.addEventListener("click", reset);


