document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const gameContainer = document.getElementById("game-container");
    const winnerScreen = document.getElementById("winner-screen");
    const boardElement = document.getElementById("board");
    const turnIndicator = document.getElementById("turn-indicator");
    const passButton = document.getElementById("pass-btn");
    const restartButton = document.getElementById("restart-btn");
    const startButton = document.getElementById("start-btn");
    const stoneSound = document.getElementById("stone-sound");

    let board = Array(7).fill(null).map(() => Array(7).fill(null));
    let currentPlayer = "black";
    let passCount = 0;

    startButton.addEventListener("click", () => {
        startScreen.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        renderBoard();
    });

    restartButton.addEventListener("click", () => {
        resetGame();
    });

    passButton.addEventListener("click", () => {
        passCount++;
        if (passCount === 2) {
            declareWinner();
        } else {
            switchPlayer();
        }
    });

    function renderBoard() {
        boardElement.innerHTML = "";
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", placeStone);
                if (board[i][j]) {
                    const img = document.createElement("img");
                    img.src = board[i][j] === "black" ? 
                        "https://i.postimg.cc/ZB4rhfPp/Screenshot-2025-01-31-12-48-23-81-bea4a7b71818d5a6507b4d4100ac0e09.jpg" :
                        "https://i.postimg.cc/wy2DxhFP/Screenshot-2025-01-31-12-48-40-57-bea4a7b71818d5a6507b4d4100ac0e09.jpg";
                    cell.appendChild(img);
                }
                boardElement.appendChild(cell);
            }
        }
    }

    function placeStone(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            passCount = 0;
            stoneSound.play();
            renderBoard();
            checkCapture(row, col);
            switchPlayer();
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "black" ? "white" : "black";
        turnIndicator.textContent = `Player ${currentPlayer === "black" ? "1" : "2"}'s Turn (${currentPlayer})`;
    }

    function checkCapture(row, col) {
        let captured = [];
        const directions = [[0,1], [1,0], [0,-1], [-1,0]];
        directions.forEach(([dx, dy]) => {
            let r = row + dx, c = col + dy;
            if (r >= 0 && r < 7 && c >= 0 && c < 7 && board[r][c] !== null && board[r][c] !== currentPlayer) {
                if (!hasLiberties(r, c)) {
                    captured.push([r, c]);
                }
            }
        });
        captured.forEach(([r, c]) => board[r][c] = null);
        renderBoard();
    }

    function hasLiberties(row, col) {
        return true; 
    }

    function declareWinner() {
        alert("Game Over! Winner Declared.");
    }

    function resetGame() {
        board = Array(7).fill(null).map(() => Array(7).fill(null));
        passCount = 0;
        renderBoard();
    }

    renderBoard();
});