class Game {
    constructor() {
        // colors
        this.boardBorder = '#000000'
        this.boardBg = '#fff'
        this.snakeColor = '#cfb87c'
        this.snakeBorder = '#000000'

        // snake
        this.snake = [
            {x: 200,y: 200},
            {x: 190,y: 200},
            {x: 180,y: 200},
            {x: 170,y: 200},
            {x: 160,y: 200},
        ]

        this.snakeBoard = document.getElementById('snakeBoard')
        this.snakeBoardCtx = this.snakeBoard.getContext('2d')

        // helps with direction
        this.dx = 10
        this.dy = 0

        //speed
        this.speed = 100

        this.changeDirection = false

        this.foodX = 0
        this.foodY = 0
    }

    init() {
        //set a timer
        setTimeout(() => {
            this.makeCanvas()
            this.drawSnake()
            this.moveSnake()

            // call init - recursion
            this.init()
        }, this.speed);
    }

    // 1 makeCanvas
    makeCanvas() {
        const snakeBoard = this.snakeBoard;
        const snakeBoardCtx = this.snakeBoardCtx

        snakeBoardCtx.fillStyle = this.boardBg
        snakeBoardCtx.strokeStyle = this.boardBorder
        snakeBoardCtx.fillRect(0,0, snakeBoard.width, snakeBoard.height)
        snakeBoardCtx.strokeRect(0,0, snakeBoard.width, snakeBoard.height)
    }

    drawSnake() {
        const snake = this.snake
        const snakeBoardCtx = this.snakeBoardCtx

        snake.forEach(snakePart => {
            snakeBoardCtx.fillStyle = this.snakeColor
            snakeBoardCtx.strokeStyle = this.snakeBorder
            snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10)
            snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10)
        })
    }

    // 3 moveSnake
    moveSnake() {
        const snake = this.snake
        const head = {x: snake[0].x + this.dx, y: snake[0].y + this.dy} // {x: 210, y: 200}
        snake.unshift(head)

        snake.pop()
    }

    // 4 changeDirection
    changeDirection(e) {
        const LEFT = 37
        const RIGHT = 39
        const UP = 38
        const DOWN = 40 

        if (this.changeDirection) return
        this.changeDirection = true

        const keyPressed = e.keyCode
        console.log(keyPressed);

        const goingUp = this.dy === -10
        const goingDown = this.dy === -10
        const goingRight  = this.dx === -10
        const goingLeft = this.dx === -10

        if (keyPressed === LEFT && !goingRight) {
            this.dx = -10
            this.dy = 0
        }
        if (keyPressed === UP && !goingDown) {
            this.dx = -10
            this.dy = 0
        }
        if (keyPressed === RIGHT && !goingLeft) {
            this.dx = -10
            this.dy = 0
        }
        if (keyPressed === DOWN && !goingUp) {
            this.dx = -10
            this.dy = 0
        }
    }
    // 5 drawFood
    drawFood() {
        this.snakeBoardCtx.fillStyle = 'darkgoldenbrown'
        this.snakeBoardCtx.strokeStyle = 'limegreen'
        this.snakeBoardCtx.fillRect(this.foodX, this.foodY, 10, 10)
        this.snakeBoardCtx.strokeRect(this.foodX, this.foodY, 10, 10)
    }

    randomFood(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10
    }
}

const snake = new Game()
snake.init()

document.addEventListener('keydown', ()=> {
    snake.changeDirection(event)
})