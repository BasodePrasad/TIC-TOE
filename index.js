const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset');
let turnO = true; // Player O starts
const newGameBtn = document.querySelector('#new-btn');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText === '') { // Only allow empty boxes to be clicked
            if (turnO) {
                box.innerText = 'O';
                box.style.color = 'green';
            } else {
                box.innerText = 'X';
                box.style.color = 'black';
            }
            turnO = !turnO; // Toggle turn
            box.disabled = true;
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== '' && pos2Val !== '' && pos3Val !== '' && 
            pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }

    // Check for draw
    let isDraw = true;
    for (let box of boxes) {
        if (box.innerText === '') {
            isDraw = false;
            break;
        }
    }
    
    if (isDraw) {
        msg.innerText = 'Match Drawn';
        msgContainer.classList.remove('hide');
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);