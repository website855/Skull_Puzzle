const imagePath = 'skull.jpg'; // Make sure this file is in the same directory
const rows = 3;
const cols = 3;
let puzzlePieces = [];
let shuffledPuzzle = [];

function initializeGame() {
    const puzzleBoard = document.getElementById('puzzle-board');
    const containerSize = puzzleBoard.offsetWidth;
    const pieceWidth = containerSize / cols;
    const pieceHeight = containerSize / rows;

    puzzlePieces = [];
    let pieceId = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = {
                id: pieceId++,
                row,
                col,
                src: imagePath,
                bgPosPercent: {
                    x: (col / (cols - 1)) * 100,
                    y: (row / (rows - 1)) * 100
                }
            };
            puzzlePieces.push(piece);
        }
    }

    shufflePuzzle();
    createPuzzleBoard();
}

function createPuzzleBoard() {
    const puzzleBoard = document.getElementById('puzzle-board');
    puzzleBoard.innerHTML = '';

    shuffledPuzzle.forEach((piece, index) => {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.setAttribute('data-id', index);
        div.setAttribute('draggable', true);
        div.style.backgroundImage = `url(${piece.src})`;
        div.style.backgroundPosition = `${piece.bgPosPercent.x}% ${piece.bgPosPercent.y}%`;
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragover', handleDragOver);
        div.addEventListener('drop', handleDrop);
        puzzleBoard.appendChild(div);
    });
}

function shufflePuzzle() {
    shuffledPuzzle = [...puzzlePieces].sort(() => Math.random() - 0.5);
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('text/plain');
    const targetIndex = event.target.dataset.id;

    const temp = shuffledPuzzle[draggedIndex];
    shuffledPuzzle[draggedIndex] = shuffledPuzzle[targetIndex];
    shuffledPuzzle[targetIndex] = temp;

    createPuzzleBoard();
}

document.getElementById('shuffle-btn').addEventListener('click', () => {
    shufflePuzzle();
    createPuzzleBoard();
});

document.getElementById('check-btn').addEventListener('click', () => {
    const isSolved = shuffledPuzzle.every((piece, index) => piece.id === index);
    const message = isSolved ? '🎉 Congratulations, you solved the puzzle!' : '❌ Try again!';
    document.getElementById('message').textContent = message;
});

window.addEventListener('resize', () => {
    initializeGame();
});

initializeGame();
