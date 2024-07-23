let boxes = document.querySelectorAll('.Box');
let resetBtn = document.querySelector('#reset');
let newGameBtn = document.querySelector('#new');
let msgContainer = document.querySelector('.msg-con');
let msg = document.querySelector('#msg');

let turn = 0;
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 7, 8],
];

boxes.forEach(Box => {
    Box.addEventListener('click', () => {
        if (turn === 0) {
            Box.innerText = 'X';
            turn = 1;
        } else {
            Box.innerText = 'O';
            turn = 0;
        }
        Box.disabled = true;
        checkWin();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    if(turn === 0){
        msg.innerText = `Congratulations, Winner is O!!`;
    } else {
        msg.innerText = `Congratulations, Winner is X!!`;
    }
    msgContainer.classList.remove("hide");
    disableBoxes();

    // Get the winning pattern
    for (pattern of win) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;
        if (p1 != "" && p2 != "" && p3 != "") {
if (p1 === p2 && p2 === p3) {
                // Add the winner class to the winning boxes
                boxes[pattern[0]].classList.add("winning-box");
                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winning-box");
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winning-box");
                boxes[pattern[2]].classList.add("winner");
            }
        }
    }
};

const checkWin = () => {
    for (pattern of win) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;
        if (p1!= "" && p2!= "" && p3!= "") {
            if (p1 === p2 && p2 === p3) {
                showWinner(p1);
                return;
            }
        }
    }
    // Check if all boxes are filled and no winner is found
    let allBoxesFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allBoxesFilled = false;
            break;
        }
    }
    if (allBoxesFilled) {
        // Make all boxes red if all boxes are filled and no winner is found
        for (let box of boxes) {
            box.classList.add("no-winner");
        }
    }
};

const resetGame = () => {
    turn = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    // Remove the winner class from all boxes
    for (let box of boxes) {
        box.classList.remove("winner");
        box.classList.remove("no-winner");
    }
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);