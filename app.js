let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; 
        if (turnX) {
            box.innerText = "X";
            box.classList.add("x-color");
            turnX = false;
        } else {
            box.innerText = "O";
            box.classList.add("o-color");
            turnX = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
        box.classList.add("disabled"); 
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-color", "o-color", "winning-color");
        box.classList.remove("disabled");
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    msg.classList.remove("msg-x", "msg-o"); 
    if (winner === "X") {
        msg.classList.add("msg-x");
    } else if (winner === "O") {
        msg.classList.add("msg-o");
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [pos1, pos2, pos3] = pattern;
        let pos1Val = boxes[pos1].innerText;
        let pos2Val = boxes[pos2].innerText;
        let pos3Val = boxes[pos3].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            boxes[pos1].classList.add("winning-color");
            boxes[pos2].classList.add("winning-color");
            boxes[pos3].classList.add("winning-color");
            showWinner(pos1Val);
            return true;
        }
    }
    return false;
};

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.classList.remove("msg-x", "msg-o");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
