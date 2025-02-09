let boardSize = 8;
        let queensPlaced = 0;
        let maxQueens;
        let board = [];
        
        function generateBoard() {
            boardSize = parseInt(document.getElementById("boardSize").value);
            maxQueens = boardSize;
            queensPlaced = 0;
            board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
            
            const container = document.getElementById("boardContainer");
            container.innerHTML = "";
            container.style.gridTemplateColumns = `repeat(${boardSize}, 50px)`;
            container.style.gridTemplateRows = `repeat(${boardSize}, 50px)`;
            container.classList.add("board");
            
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell", (i + j) % 2 === 0 ? "white" : "black");
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    cell.addEventListener("click", placeQueen);
                    container.appendChild(cell);
                }
            }
        }
        
        function placeQueen(event) {
            let row = parseInt(event.target.dataset.row);
            let col = parseInt(event.target.dataset.col);
            
            if (board[row][col] !== 0 || queensPlaced >= maxQueens) return;
            
            board[row][col] = 1;
            event.target.innerHTML = "♛";
            event.target.classList.add("queen");
            queensPlaced++;
            
            markRestrictedCells();
            checkGameStatus();
        }
        
        function markRestrictedCells() {
            document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("restricted"));
            
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    if (board[i][j] === 1) {
                        document.querySelectorAll(".cell").forEach(cell => {
                            let r = parseInt(cell.dataset.row);
                            let c = parseInt(cell.dataset.col);
                            if (r === i || c === j || Math.abs(r - i) === Math.abs(c - j)) {
                                cell.classList.add("restricted");
                            }
                        });
                    }
                }
            }
        }
        
        function isValidSolution() {
            let positions = [];
            for (let i = 0; i < boardSize; i++) {
                for (let j = 0; j < boardSize; j++) {
                    if (board[i][j] === 1) positions.push([i, j]);
                }
            }
            
            for (let [r1, c1] of positions) {
                for (let [r2, c2] of positions) {
                    if (r1 !== r2 && (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2))) {
                        return false;
                    }
                }
            }
            return true;
        }
        
        function checkGameStatus() {
            let availableCells = document.querySelectorAll(".cell:not(.queen):not(.restricted)").length;
            if (queensPlaced === maxQueens) {
                if (isValidSolution()) {
                    document.getElementById("gameMessage").innerText = "Congrats! Right answer";
                } else {
                    document.getElementById("gameMessage").innerText = "Oops! Wrong answer";
                }
            } else if (availableCells === 0) {
                document.getElementById("gameMessage").innerText = "Incorrect Answer! No more available moves.";
            }
        }
        
        function resetBoard() {
            generateBoard();
            document.getElementById("gameMessage").innerText = "";
        }
        
        generateBoard();