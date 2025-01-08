class FlipClock {
    constructor() {
        this.minutesTens = document.querySelector('.minutes-tens');
        this.minutesOnes = document.querySelector('.minutes-ones');
        this.secondsTens = document.querySelector('.seconds-tens');
        this.secondsOnes = document.querySelector('.seconds-ones');
        
        this.startPauseButton = document.getElementById('startPause');
        this.playIcon = this.startPauseButton.querySelector('.play-icon');
        this.pauseIcon = this.startPauseButton.querySelector('.pause-icon');
        this.resetButton = document.getElementById('reset');
        this.modeInputs = document.querySelectorAll('.toggle-switch input[type="radio"]');

        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;

        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        this.startPauseButton.addEventListener('click', () => {
            if (this.isRunning) {
                this.pause();
            } else {
                this.start();
            }
        });
        
        this.resetButton.addEventListener('click', () => this.reset());
        
        this.modeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.timeLeft = parseInt(e.target.value) * 60;
                this.updateDisplay();
                this.pause();
            });
        });
    }

    updateStartPauseButton() {
        if (this.isRunning) {
            this.playIcon.classList.add('hidden');
            this.pauseIcon.classList.remove('hidden');
        } else {
            this.playIcon.classList.remove('hidden');
            this.pauseIcon.classList.add('hidden');
        }
    }

    animateFlip(element, newValue) {
        const digit = element.querySelector('.digit');
        const front = digit.querySelector('.digit-front');
        const back = digit.querySelector('.digit-back');

        back.textContent = newValue;
        digit.classList.add('flip');

        // After animation completes
        setTimeout(() => {
            front.textContent = newValue;
            digit.classList.remove('flip');
        }, 300);
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;

        const minutesTensNew = Math.floor(minutes / 10);
        const minutesOnesNew = minutes % 10;
        const secondsTensNew = Math.floor(seconds / 10);
        const secondsOnesNew = seconds % 10;

        const currentMinutesTens = this.minutesTens.querySelector('.digit-front').textContent;
        const currentMinutesOnes = this.minutesOnes.querySelector('.digit-front').textContent;
        const currentSecondsTens = this.secondsTens.querySelector('.digit-front').textContent;
        const currentSecondsOnes = this.secondsOnes.querySelector('.digit-front').textContent;

        if (currentMinutesTens !== minutesTensNew.toString()) {
            this.animateFlip(this.minutesTens, minutesTensNew);
        }
        if (currentMinutesOnes !== minutesOnesNew.toString()) {
            this.animateFlip(this.minutesOnes, minutesOnesNew);
        }
        if (currentSecondsTens !== secondsTensNew.toString()) {
            this.animateFlip(this.secondsTens, secondsTensNew);
        }
        if (currentSecondsOnes !== secondsOnesNew.toString()) {
            this.animateFlip(this.secondsOnes, secondsOnesNew);
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.updateStartPauseButton();
            this.timerId = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                    this.updateDisplay();
                } else {
                    this.pause();
                    // Optional: Add sound notification here
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        this.updateStartPauseButton();
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    reset() {
        this.pause();
        const activeMode = document.querySelector('.toggle-switch input[type="radio"]:checked');
        this.timeLeft = parseInt(activeMode.value) * 60;
        this.updateDisplay();
    }
}

// Initialize the clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlipClock();
}); 