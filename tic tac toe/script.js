document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const resetBtn = document.getElementById("resetBtn");

    let currentPlayer = "X";
    let gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    // Function to check for a winner
    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            // Check rows
            if (
                gameBoard[i][0] === currentPlayer &&
                gameBoard[i][1] === currentPlayer &&
                gameBoard[i][2] === currentPlayer
            ) {
                highlightWinnerCells(i, 0, i, 1, i, 2);
                return true;
            }
            // Check columns
            if (
                gameBoard[0][i] === currentPlayer &&
                gameBoard[1][i] === currentPlayer &&
                gameBoard[2][i] === currentPlayer
            ) {
                highlightWinnerCells(0, i, 1, i, 2, i);
                return true;
            }
        }
        // Check diagonals
        if (
            gameBoard[0][0] === currentPlayer &&
            gameBoard[1][1] === currentPlayer &&
            gameBoard[2][2] === currentPlayer
        ) {
            highlightWinnerCells(0, 0, 1, 1, 2, 2);
            return true;
        }
        if (
            gameBoard[0][2] === currentPlayer &&
            gameBoard[1][1] === currentPlayer &&
            gameBoard[2][0] === currentPlayer
        ) {
            highlightWinnerCells(0, 2, 1, 1, 2, 0);
            return true;
        }
        return false;
    }

    // Function to highlight the winning cells with celebration animation
    function highlightWinnerCells(row1, col1, row2, col2, row3, col3) {
        board.rows[row1].cells[col1].classList.add("winner-cell", "celebrate");
        board.rows[row2].cells[col2].classList.add("winner-cell", "celebrate");
        board.rows[row3].cells[col3].classList.add("winner-cell", "celebrate");
    }

    // Function to reset the winner cells and celebration animation
    function resetWinnerCells() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board.rows[i].cells[j].classList.remove("winner-cell", "celebrate");
            }
        }
    }

    // Function to check if the board is full
    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }

    // Function to handle cell clicks
    function cellClick(row, col) {
        if (gameBoard[row][col] === "" && !checkWinner()) {
            gameBoard[row][col] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                message.textContent = `Player ${currentPlayer} wins!`;
            } else if (isBoardFull()) {
                message.textContent = "It's a tie!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Function to render the game board
    function renderBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board.rows[i].cells[j].textContent = gameBoard[i][j];
            }
        }
    }

    // Event listener for cell clicks
    board.addEventListener("click", function (event) {
        const cell = event.target;
        const row = cell.parentElement.rowIndex;
        const col = cell.cellIndex;
        cellClick(row, col);
    });

    // Event listener for reset button
    resetBtn.addEventListener("click", function () {
        currentPlayer = "X";
        gameBoard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        message.textContent = "";
        resetWinnerCells();
        renderBoard();
    });

    // Initial rendering of the board
    renderBoard();
});
