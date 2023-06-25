// board
let blockSize = 25; // one unit in snake game
let rows = 20; //number of rows
let cols = 20; //number of columns
let board = document.getElementById("canvas");
let context = board.getContext("2d");
let showScore = document.getElementById("score");

// buttons
let left = document.getElementById("left");
let right = document.getElementById("right");
let up = document.getElementById("up");
let down = document.getElementById("down");

//snake position
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// snake food
let foodX; //generate its random value in place food function
let foodY; //generate its random value in place food function

// for direction
let velocityX = 0;
let velocityY = 0;

//snake body
let snakeBody = [];

// game over flag
let gameOver = false;

// score

let score = 0;

window.onload = () => {
    board.height = rows * blockSize; //20 blocks
    board.width = cols * blockSize; // 20 blocks

    placeFood(); // for food placement
    document.addEventListener("keyup", changeDirection);
    // update() // update the board
    setInterval(update, 150);
};

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = "#0d233a";
    context.fillRect(0, 0, board.height, board.width);

    // food styling
    context.fillStyle = "#a3d4f2";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score = score + 1;
    }

    // for grow snake
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // snake styling in canvas
    context.fillStyle = "#206ca0";
    // for change snake position
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //to show grown snake
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // game over conditions
    if (
        snakeX < 0 ||
        snakeX >= rows * blockSize ||
        snakeY < 0 ||
        snakeY >= cols * blockSize
    ) {
        gameOver = true;
        // sweet alert
        Swal.fire({
            icon: "error",
            title: "Game Over",
            text: `Score: ${score}`,
            confirmButtonColor: "#0d233a",
            confirmButtonText: "OK",
        });
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            // sweet alert
            Swal.fire({
                icon: "error",
                title: "Game Over",
                text: `Score: ${score}`,
                confirmButtonColor: "#0d233a",
                confirmButtonText: "OK",
            });
        }
    }

    showScore.innerText = score;
}

function changeDirection(event) {
    if (event.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (event.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
}

//button click functions
left.addEventListener("click", () => {
    if (velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
});
right.addEventListener("click", () => {
    if (velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
});
up.addEventListener("click", () => {
    if (velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
});
down.addEventListener("click", () => {
    if (velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
});

function placeFood() {
    foodX = Math.floor(Math.random() * rows) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}