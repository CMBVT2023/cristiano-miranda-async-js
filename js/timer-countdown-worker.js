// Initializes a global variable to showcase that all worker calls are isolated.
let globalVariable = 'Not Changed';

// Initializes a global eventListener that triggers once a "message" event occurs.
addEventListener("message", (message) => {
    // Calls the function to create a timer, and passes the timer's delay and type to the function.
    createTimer(message.data.timer, message.data.delay)
})

// Creates a timer using setInterval that counts down every 1s.
// In this case, the postMessage is called once every second and it passes the type of type and the current value of countdown.
// This is necessary since this worker is unable to update or alter the dom or any of its elements in any way.
function createTimer(timer, delay) {
    // Initializes the countdown variable set equal to the delay value passed in.
    let countdown = delay;
    // If the timer is greater than ten seconds, change the global variable.
    if (delay > 10) {
        globalVariable = 'Changed';
    }
    // Initializes a interval that occurs every 1 second.
    let currentTimer = setInterval(() => {
        // Sends a message to the main page containing the timer type and the current value of countdown.
        postMessage({timer, countdown});
        // Logs the timer type and the current value of countdown,
        // this helps to show when all timers are running/triggering concurrently.
        console.log(timer, countdown, globalVariable)
        // Decrement countdown.
        countdown--;
        // Checks if the value of countdown is less than 0, and clears the interval.
        if (countdown < 0) {
            clearInterval(currentTimer)
        }
    }, 1000)
}

