//Hello

let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startButton = document.getElementById("btn-start");
let pauseButton = document.getElementById("btn-pause");
let resetButton = document.getElementById("btn-reset");
let forwardButton = document.getElementById("btn-forward");
let time = document.getElementById("time");
let pomoButton = document.getElementById("pomos");

let active = "focus";
let countdownFinished = false;
let pomo = 0;

let set;
let count = 59;
let paused = true;
let minCount = 24;

time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
    value = value<10 ? `0${value}` : value;
    return value;
};

var audio = new Audio("click.mp3");
var audio2 = new Audio("end.mp3");

resetButton.addEventListener("click", 
    (resetTime = () => {
        countdownFinished = false;
        pauseTimer();
        switch(active){
            case "long":
                    minCount = 14;
                    break;
            case "short":
                    minCount = 4;
                    break;
            case "focus":
                    minCount = 24;
                    break;
        }
        count = 59;
        time.textContent = `${minCount + 1}:00`;
    })
);

forwardButton.addEventListener("click", () => {
        pomo++; 
        updatePomoButton(); 
        resetTime(); 
});

const removeFocus = () => {
    buttons.forEach((btn) =>{
        btn.classList.remove("btn-focus");
    });
};

focusButton.addEventListener("click", () => {
    countdownFinished = false;
    active = "focus";
    removeFocus();
    focusButton.classList.add("btn-focus");
    pauseTimer();
    count = 59;
    minCount = 24;
    time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
    countdownFinished = false;
    active = "short";
    removeFocus();
    shortBreakButton.classList.add("btn-focus");
    pauseTimer();
    count = 59;
    minCount = 4;
    time.textContent = `0${minCount + 1}:00`;
});

longBreakButton.addEventListener("click", () => {
    countdownFinished = false;
    active = "long";
    removeFocus();
    longBreakButton.classList.add("btn-focus");
    pauseTimer();
    count = 59;
    minCount = 14;
    time.textContent = `${minCount + 1}:00`;
});

pauseButton.addEventListener("click", 
    (pauseTimer = () =>{
        audio.currentTime = -10^5;
        audio.play();
        paused = true;
        clearInterval(set);
        startButton.classList.remove("hide");
        pauseButton.classList.remove("show");
        resetButton.classList.remove("show");
        forwardButton.classList.remove("show");
    })
);

startButton.addEventListener("click",
    () => {
        audio.currentTime = -10^5;
        audio.play();
        pauseButton.classList.add("show");
        resetButton.classList.add("show");
        forwardButton.classList.add("show");
        startButton.classList.add("hide");
        startButton.classList.remove("show");

        if(paused==true){
            paused = false;
            countdownFinished = false;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            set = setInterval(() => {
                count--;
                time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;

                if(count<=17 && minCount==0 && !countdownFinished){
                    audio2.play();
                }
                if(count==0){
                    if(minCount != 0){
                        minCount--;
                        count = 60;
                    }
                    else{
                        clearInterval(set);
                        countdownFinished = true;
                        pomo++;
                        updatePomoButton();
                    }
                }
            },1000)
        }
    });

function updatePomoButton() {
    const pomoButton = document.getElementById("pomos");
    pomoButton.textContent = `Pomodoros Done: ${pomo}`;
}
updatePomoButton();

pomoButton.addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to reset the pomodoro count?");
    if (confirmation) {
        pomo = 0; 
        updatePomoButton(); 
        resetTime();
        alert("Pomodoro count has been reset."); 
    }
}); 

