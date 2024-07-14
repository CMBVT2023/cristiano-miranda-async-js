const generatingPrimesExampleElements = document.getElementById('generating-primes-example');
const stringManipulationExampleElements = document.getElementById('string-manipulation-example');
const timerCountDownExampleElements = document.getElementById('timer-count-down-example');

// Generating Primes Example either through a synchronous function or asynchronous function.
function generatingPrimesExample(type, num, time) {
    // Checks the boolean value of type, true is synchronous and false is asynchronous.
    if (type) {
        // Creates a function to check if the number is prime.
        function isPrime(n) {
            for (let c = 2; c <= Math.sqrt(n); c++) {
                // If the number is divisible by the value of the current loop value, return false
                // to indicate the number is not prime.
                if (n % c === 0) {
                    return false;
                }
            }

            // If no number is flagged, return true indicating the number is prime.
            return true;
        }

        // Initializes an array and a maximum value amount.
        const primes = [];
        const maximum = 10000000;

        // Initializes a loop until the primes array contains an amount of elements equal to the number passed in.
        while (primes.length < num) {
            // Initializes a random number to test.
            const candidate = Math.floor(Math.random() * (maximum + 1));
            // Passes the candidate to the function and if it is prime,
            // it pushes it to the array.
            if (isPrime(candidate)) {
                primes.push(candidate);
            }
        }

        // Returns the primes array
        return primes.length;
    } else {
        // Initializes a new worker utilizing the prime-worker.js file.
        const worker = new Worker('../js/prime-worker.js');

        // Sends a message to the worker and passes the command "generate" and the number of primes to generate.
        worker.postMessage({command: "generate", num});

        // Initializes an eventListener to the worker.
        // Once the event "message" is triggered, the message data from the message is taken and set equal to associated display element.
        // Finally the span element is updated with the amount of time it took for the "message" event to occur.
        worker.addEventListener("message", (message) => {
            let numberGenerated = message.data;
            generatingPrimesExampleElements.querySelector('strong').innerHTML = numberGenerated;
            generatingPrimesExampleElements.querySelector('span').innerHTML = `Finished <br> Worker function finished in ${Date.now() - time} milliseconds.`;
        })
    }

    // Biggest thing to note, with the worker, much like with the other asynchronous functions like async and await and promise, the code after the worker call
    // will continue to execute. As opposed to returning the primes like the synchronous function above, the display updates have to occur in the worker's event listener
    // since the data to be displayed requires the worker to finish executing their function. 
}

// String Manipulation Example.
function stringManipulationExample(type, name) {
    // Stores the time the function started executing
    let time = Date.now()
    
    // Initializes a new worker using the 'string-manipulation-worker.js' file.
    const stringManipulationWorker = new Worker('../js/string-manipulation-worker.js');

    // Checks the value of the type parameter passed in.
    if (type == 1) {
        // If the value equates to 1, trigger the spinal-tap command and passes the name parameter through.
        stringManipulationWorker.postMessage({command: "spinal-tap", name});
    } else if (type == 2) {
        // If the value equates to 2, trigger the capitalize command and passes the name parameter through.
        stringManipulationWorker.postMessage({command: "capitalize", name});
    } else if (type == 3) {
        // If the value equates to 3, trigger the lower-case command and passes the name parameter through.
        stringManipulationWorker.postMessage({command: "lower-case", name});
    }

    // Creates a node list containing the various ol list elements.
    let lists = stringManipulationExampleElements.querySelectorAll('ol');

    // Initializes an eventListener that triggers once the stringManipulationWorker sends a post message back to the main page.
    stringManipulationWorker.addEventListener('message', (message) => {
        // Checks the return value to see what command was triggered.
        if (message.data.return === "spinal-tap") {
            // If the spinal-tap command gets returned, log the returned string to the console,
            // append the string to the first element of the node list,
            // and display the time it took for the worker to finish executing.
            console.log(message.data.str)
            lists[0].innerHTML += `<li>${message.data.str}</li>`;
            stringManipulationExampleElements.querySelector('span').innerHTML = `${message.data.return} <br>
             Worker finished executing in ${Date.now() - time} milliseconds.`;
        } else if (message.data.return === "capitalize") {
            // If the capitalize command gets returned, log the returned string to the console,
            // append the string to the second element of the node list,
            // and display the time it took for the worker to finish executing.
            console.log(message.data.str)
            lists[1].innerHTML += `<li>${message.data.str}</li>`;
            stringManipulationExampleElements.querySelector('span').innerHTML = `${message.data.return} <br>
             Worker finished executing in ${Date.now() - time} milliseconds.`;
        } else if (message.data.return === "lower-case") {
            // If the lower-case command gets returned, log the returned string to the console,
            // append the string to the third element of the node list,
            // and display the time it took for the worker to finish executing.
            console.log(message.data.str)
            lists[2].innerHTML += `<li>${message.data.str}</li>`;
            stringManipulationExampleElements.querySelector('span').innerHTML = `${message.data.return} <br>
             Worker finished executing in ${Date.now() - time} milliseconds.`;
        }
    })

    // Displays the time it took for the initial function to finish executing.
    stringManipulationExampleElements.querySelector('h6').innerHTML = `Initial function finished in ${Date.now() - time} milliseconds.`

    // Initially, this example was supposed to be a localStorage based example, but upon implementing most of the code, I realized that without
    // the worker has no webpage that allows them to store said information. I would need to add the script to the html webpage, which takes away
    // the point of the worker, so it is not the best idea to use workers for localStorage. Instead when using workers, they should be limited to
    // what the tutorial recommended, which is information passed into it like variables, arrays, objects, but no DOM elements since the worker has
    // no access to any DOM elements or any webpage elements in general.

    // This example helped me learn how to have a worker with more than one command and to see if multiple workers could be utilized at
    // once, even if it is the same worker. In this case, even passing all commands at once works and it seems like a worker can be initialized
    // multiple times, similar to how an eventListener can be initialized multiple time and trigger the same function/code multiple times at once.
}

// Timer Count Down Example
function timerCountDownExample(delay) {
    // Initializes a new worker based on the 'timer-countdown-worker' javascript file.
    const timerCountDownWorker = new Worker('../js/timer-countdown-worker.js');

    // Checks the value of the delay, and sends a message to the worker containing the type of timer and the delay for it.
    if (delay == 10) {
        // // When posting a message to a worker any information passed to it needs to be within an object, even if it is a singular variable.
        timerCountDownWorker.postMessage({timer: "10s", delay});
    } else if (delay == 15) {
        timerCountDownWorker.postMessage({timer: "15s", delay});
    } else if (delay == 20) {
        timerCountDownWorker.postMessage({timer: "20s", delay});
    }

    // Creates a node list of all the strong elements from the timerCountDownExample div.
    let timerDisplays = timerCountDownExampleElements.querySelectorAll('strong');

    // Initializes an eventListener that triggers every time the worker sends a message.
    timerCountDownWorker.addEventListener('message', (message) => {
        // Checks the type of timer that is passing the message, and updates the appropriate display based on the type of timer.
        if (message.data.timer == "10s") {
            timerDisplays[0].innerHTML = message.data.countdown;
            message.data.countdown == 0 ? timerCountDownExampleElements.querySelector('span').innerHTML = `10s Timer Finished` : '';
        } else if (message.data.timer == "15s") {
            timerDisplays[1].innerHTML = message.data.countdown;
            message.data.countdown == 0 ? timerCountDownExampleElements.querySelector('span').innerHTML = `15s Timer Finished` : '';
        } else if (message.data.timer == "20s") {
            timerDisplays[2].innerHTML = message.data.countdown;
            message.data.countdown == 0 ? timerCountDownExampleElements.querySelector('span').innerHTML = `20s Timer Finished` : '';
        }
    })

    // This is a good way to show that workers can be triggered multiple times and data from them can be received multiple times. However,
    // it is also a good way to show the troubles that might occur with trying to use workers with repetition since unlike with the main page,
    // the worker calls are separate and treated as individual calls, meaning that even if say a global variable is changed on the third call while the
    // first call is still active, the first call will not be updated with the changes. This can be seen in the console after calling the 10s timer,
    // and then the 15s or 20s timer. This issue results in no easy way for the timers to be stopped once they are started.
}

function loadEventListeners() {
    // Creates a node list of the various button elements in the generatingPrimesExample.
    let generatingPrimesButtons = generatingPrimesExampleElements.querySelectorAll('button');
    // Initializes the various eventListeners for the generatingPrimesExample.
    generatingPrimesButtons[0].addEventListener('click', () => {
        // Calls the method to generate primes using the synchronous function and displays the results in their associated display elements.
        let number = generatingPrimesExampleElements.querySelector('input').value;
        let time = Date.now();
        let result = generatingPrimesExample(true, number, time);
        generatingPrimesExampleElements.querySelector('h5').innerHTML = `Function finished executing in ${Date.now() - time} milliseconds.`;
        generatingPrimesExampleElements.querySelector('strong').innerHTML = result;
        generatingPrimesExampleElements.querySelector('span').innerHTML = `Finished`;
    })
    generatingPrimesButtons[1].addEventListener('click', () => {
        // Calls the method to generate primes using the asynchronous function and displays the results in their associated display elements.
        let number = generatingPrimesExampleElements.querySelector('input').value;
        let time = Date.now();
        generatingPrimesExample(false, number, time);
        generatingPrimesExampleElements.querySelector('h5').innerHTML = `Initial function finished executing in ${Date.now() - time} milliseconds.`;
        generatingPrimesExampleElements.querySelector('span').innerHTML = `Started`;
    })
    generatingPrimesButtons[2].addEventListener('click', () => {
        // Resets all of the display elements to their default display values.
        generatingPrimesExampleElements.querySelector('span').innerHTML = `Not Started`;
        generatingPrimesExampleElements.querySelector('h5').innerHTML = ``;
        generatingPrimesExampleElements.querySelector('strong').innerHTML = ``;
        generatingPrimesExampleElements.querySelector('input').value = `1000000`;
        generatingPrimesExampleElements.querySelector('textarea').value = ``;
    })

    // Creates a node list of the button elements from the stringManipulationExample div.
    let stringManipulationButtons = stringManipulationExampleElements.querySelectorAll('button');
    // Initialized the various eventListeners for the stringManipulationExample.
    stringManipulationButtons[0].addEventListener('click', () => {
        stringManipulationExample(1, stringManipulationExampleElements.querySelector('input').value);
    })
    stringManipulationButtons[1].addEventListener('click', () => {
        stringManipulationExample(2, stringManipulationExampleElements.querySelector('input').value);
    })
    stringManipulationButtons[2].addEventListener('click', () => {
        stringManipulationExample(3, stringManipulationExampleElements.querySelector('input').value);
    })
    stringManipulationButtons[3].addEventListener('click', () => {
        // Calls all worker commands at once.
        stringManipulationExample(1, stringManipulationExampleElements.querySelector('input').value);
        stringManipulationExample(2, stringManipulationExampleElements.querySelector('input').value);
        stringManipulationExample(3, stringManipulationExampleElements.querySelector('input').value);
    })
    stringManipulationButtons[4].addEventListener('click', () => {
        // Resets all display elements to their default states.
        stringManipulationExampleElements.querySelectorAll('ol').forEach((item) => item.innerHTML = ``);
        stringManipulationExampleElements.querySelector('h6').innerHTML = ``;
        stringManipulationExampleElements.querySelector('span').innerHTML = `None`;
        stringManipulationExampleElements.querySelector('input').value = ``;
    })

    // Creates a node list of the buttons from the timerCountDownExample div.
    let timerCountDownButtons = timerCountDownExampleElements.querySelectorAll('button');
    // Initializes the various eventListeners to trigger the different timers, trigger all timers at once, or to reset all timer displays.
    timerCountDownButtons[0].addEventListener('click', () => {
        timerCountDownExampleElements.querySelector('span').innerHTML = `10s Timer Active`
        timerCountDownExample(10);
    })
    timerCountDownButtons[1].addEventListener('click', () => {
        timerCountDownExampleElements.querySelector('span').innerHTML = `15s Timer Active`
        timerCountDownExample(15);
    })
    timerCountDownButtons[2].addEventListener('click', () => {
        timerCountDownExampleElements.querySelector('span').innerHTML = `20s Timer Active`
        timerCountDownExample(20);
    })
    timerCountDownButtons[3].addEventListener('click', () => {
        timerCountDownExampleElements.querySelector('span').innerHTML = `All Timers Active`
        timerCountDownExample(10);
        timerCountDownExample(15);
        timerCountDownExample(20);
    })
    timerCountDownButtons[4].addEventListener('click', () => {
        // Resets all timers displays, but will not reset the timers themselves.
        timerCountDownExampleElements.querySelectorAll('strong').forEach((item) => item.innerHTML = ``);
        timerCountDownExampleElements.querySelector('h6').innerHTML = ``;
        timerCountDownExampleElements.querySelector('span').innerHTML = `Not Active`;
    })
}

loadEventListeners();