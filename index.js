let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('eating.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('turn.mp3');
const bgm = new Audio('bgm.mp3');
let lastpainttime = 0;
let speed = 15;
let score = 0;
let hiscoreval = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 10 }



function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;

    }
    lastpainttime = ctime;
    gameEngine();

}

function GameOver(){
    var x = document.getElementById("gameoverscreen")
    if (x.style.display ==="none") {
        
        x.style.display = "block";
    }

}

function isCollide(snake) {
    const temp = document.getElementsByClassName('gameover')

    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            // displayGameOver();
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        // displayGameOver();
        return true;
    }

    return false;
}

function gameEngine() {
    //part1:updating the snake array and food
    if (isCollide(snakeArr)) {
        gameoversound.play();
        bgm.pause();
        inputDir = { x: 0, y: 0 };
        GameOver();
        snakeArr = [{ x: 13, y: 15 }]
        bgm.play();
        score = 0;

    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HIGH SCORE: " + hiscoreval;

        }
        scoreBox.innerHTML = "YOUR SCORE: " + score
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        a = 2;
        b = 16;

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // part2:display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {

            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = food.y;
    FoodElement.style.gridColumnStart = food.x;
    FoodElement.classList.add('food');
    board.appendChild(FoodElement);



}








let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscore = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HIGH SCORE: " + hiscore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("ArrowUp");
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown");
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft");
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight");
            break;

        default:
            break;
    }
})
