document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2,1,0]

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervaltime = 0;
    let interval = 0;

    //to start, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervaltime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervaltime)
    }


    // all the outcomes of the snake
    function moveOutcomes() {
        if(
           (currentSnake[0] + width >= (width*width) && direction === width) || // if snake hits bottom
           (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
           (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
           (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
           squares[currentSnake[0] + direction].classList.contains('snake') // if snake hits its own body
        ) {
            return clearInterval(interval);
        }

        const tail = currentSnake.pop(); // remove last item of the arrat and shows it
        squares[tail].classList.remove('snake'); // remove class of snake
        currentSnake.unshift(currentSnake[0] + direction); //give direction to the head of the array

        // deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail)
            randomApple();
            score++
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervaltime = intervaltime*speed;
            interval = setInterval(moveOutcomes, intervaltime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
    }

    //assign function to keycodes
    function ctrl(e) {
        squares[currentIndex].classList.remove('snake');

        if(e.keyCode === 39) {
            direction = 1; // arrow right
        } else if(e.keyCode === 38) {
            direction = -width; // arrow up
        } else if(e.keyCode === 37) {
            direction = -1; //arrow left
        } else if(e.keyCode === 40) {
            direction = +width; //arrow down
        }
    }

    document.addEventListener('keyup', ctrl);
    startBtn.addEventListener('click', startGame)
})