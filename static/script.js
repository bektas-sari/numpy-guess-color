let correctCount = 0;
let wrongCount = 0;
let roundsPlayed = 0;
const totalRounds = 5;

function flipCard() {
    document.querySelector(".card").classList.add("flip");
}

function resetCard() {
    setTimeout(() => {
        document.querySelector(".card").classList.remove("flip");
        document.getElementById("result").innerText = "";
        document.getElementById("card-back").style.background = "white";
    }, 1000);
}

window.makeGuess = function(guess) {
    if (roundsPlayed >= totalRounds) return;

    fetch("/guess", {
        method: "POST",
        body: JSON.stringify({ guess: guess }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        roundsPlayed++;

        let cardBack = document.getElementById("card-back");
        let resultText = document.getElementById("result");

        cardBack.style.background = data.correct ? guess : (guess === "blue" ? "red" : "blue");

        resultText.innerText = data.correct ? "✔️ You guessed right!" : "❌ Wrong guess!";
        resultText.classList.add("result-visible");

        setTimeout(() => {
            resultText.classList.remove("result-visible");
        }, 1500); // 🔥 Message disappears smoothly after 1.5 seconds

        if (data.correct) {
            correctCount++;
        } else {
            wrongCount++;
        }

        document.getElementById("correct-count").innerText = correctCount;
        document.getElementById("wrong-count").innerText = wrongCount;

        flipCard();
        resetCard();

        if (roundsPlayed === totalRounds) {
            document.getElementById("final-score").innerText = `🎯 Game Over! Final Score: ${correctCount}/${totalRounds}`;
            document.getElementById("restart-btn").style.display = "block";
        }
    });
};


window.restartGame = function() {
    correctCount = 0;
    wrongCount = 0;
    roundsPlayed = 0;

    document.getElementById("correct-count").innerText = "0";
    document.getElementById("wrong-count").innerText = "0";
    document.getElementById("result").innerText = "";
    document.getElementById("final-score").innerText = "";
    document.getElementById("restart-btn").style.display = "none";
};
