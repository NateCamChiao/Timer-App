let timerContainer = document.querySelector(".player-control");
let stopWatchTextSecs = document.querySelector("#stopwatch-timer-text-secs");
let stopWatchTextMins = document.querySelector("#stopwatch-timer-text-mins");
    
let timer = {
    hours: 0,
    mins: 0,
    secs: 0,
    startDate: null,
    lastDate: 0
}

let stopWatchText = "00:00.00";
let updateStopwatchInterval;
let isRunning = false;

let lapTimes = [];

function toggleStopwatch(){
    timerContainer.querySelectorAll("span").forEach(span => {
        span.classList.toggle("hidden");
    });
    if(isRunning){
        pauseStopwatch();
    }
    else{
        startStopwatch();
    }
    isRunning = !isRunning; 
}

function startStopwatch(){
    timer.lastDate = new Date();
    updateStopwatchInterval = setInterval(updateStopwatch, 100);
}

function getTimeDifference(){
    // if(timer.lastDate)
    const miliseconds = new Date().getTime() - timer.lastDate.getTime();
    return {
        milisecondDiff: miliseconds,
        secondDiff: Math.floor(miliseconds / 1000 + timer.secs) % 60,
        minuteDiff: Math.floor(miliseconds / 60000 + timer.mins)
    }
}

function updateStopwatch(){
    let currentDate = new Date();
    let currentMinutes = currentDate.getMinutes();
    let lastMinutes = timer.lastDate.getMinutes();

    let minuteDiff = currentMinutes - lastMinutes < 0? 60 - lastMinutes : currentMinutes - lastMinutes;

    let currentSeconds = currentDate.getSeconds();
    let lastSeconds = timer.lastDate.getSeconds();

    let secondDiff = currentSeconds - lastSeconds < 0? 60 - lastSeconds : currentSeconds - lastSeconds;
    
    // timer.mins += minuteDiff; //* if negative then make first num 60
    // timer.secs += secondDiff;
    // if(timer.mins >= 59)
    //     timer.mins -= 59;
    // if(timer.secs >= 59)
    //     timer.secs -= 59;
    let timeDifference = getTimeDifference();
    // console.log(currentDate.getMinutes(), timer.lastDate.getMinutes(), timer.secs);
    console.log(timeDifference.minuteDiff, timeDifference.secondDiff);
    // timer.lastDate = currentDate;

    stopwatchHTML(timeDifference.minuteDiff, timeDifference.secondDiff);
}

function stopwatchHTML(mins, secs){
    let seconds = secs > 9 ? secs : "0" + secs;
    let minutes = mins > 9 ? mins : "0" + mins;
    
    stopWatchTextMins.innerText = minutes;
    stopWatchTextSecs.innerText = seconds;
}

function pauseStopwatch(){
    let timeDifference = getTimeDifference();
    timer.mins = timeDifference.minuteDiff;
    timer.secs = timeDifference.secondDiff;
    clearInterval(updateStopwatchInterval);
    timer.lastDate = new Date();
}

function clearStopwatch(){
    clearInterval(updateStopwatchInterval);
    timer.hours = timer.mins = timer.secs = lastDate = 0;
    startDate = null;
    
    stopwatchHTML(0,0);
}

function addLapTimeElement(){
    let laptimeTemplate = document.querySelector("#lap-copy");
    let newElement = laptimeTemplate.cloneNode(true);
    newElement.id = "lapTime" + lapTimes.length;
    newElement.classList.remove("hidden");
    let lapTimesContainer = document.querySelector("#lap-times");

    newElement.querySelector(".lap-number").innerText = "Lap " + lapTimes.length;

    let lapTime = lapTimes[lapTimes.length - 1];
    let secs = lapTime.secs;
    let mins = lapTime.mins;
    let seconds = secs > 9 ? secs : "0" + secs;
    let minutes = mins > 9 ? mins : "0" + mins;
    newElement.querySelector(".lap-time").innerText = minutes + ":" + seconds;
    lapTimesContainer.appendChild(newElement);
}

function lapStopWatch(){
    let timeDifference = getTimeDifference();
    lapTimes.push({mins: timeDifference.minuteDiff, secs:timeDifference.secondDiff, hours: 0});
    addLapTimeElement();
}