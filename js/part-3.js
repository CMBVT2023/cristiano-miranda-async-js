// Initializes all of the html elements from the webpage.
const initialTimeoutTestElements = document.getElementById('initial-timeout-test');
const promiseConstructorExampleElements = document.getElementById('promise-constructor-example');

// Initial Timeout Test Example
function initialTimeoutTest(delay) {
    // Stores the time at which the function first runs.
    let time = Date.now();
    
    // Initializes a time out to trigger after the specified delay time.
    setTimeout(() => {
        initialTimeoutTestElements.querySelector('span').innerHTML = "Finished";
        initialTimeoutTestElements.querySelector('h6').innerHTML = `Timeout Triggered <br> Finished in ${Date.now() - time} milliseconds.`;
    }, delay);
    
    // Displays the total amount of time to execute the function in the associated display element.
    initialTimeoutTestElements.querySelector('span').innerHTML = `Active <br> Initial function finished in ${Date.now() - time} milliseconds.`;
}

// Promise Constructor Example
function promiseConstructorExample(delay, name) {
    // Stores the time at which the function first runs.
    let time = Date.now();

    function alarm(name, delay) {
        return new Promise((resolve, reject) => {
            if (delay < 0) {
                throw new Error("Alarm delay must not be negative!");
            }
            setTimeout(() => {
                resolve(`Wake up, ${name}!`);
            }, delay);
        });
    }

    // Displays the initial time it took to call the alarm function.
    promiseConstructorExampleElements.querySelector('span').innerHTML = `Active <br> Alarm function called in ${Date.now() - time} milliseconds.`;

    // Calls the alarm function, once executed a promise is created.
    // Once the promise gets returned, based on if the promise is successful, the then handlers are ran.
    alarm(name, delay).then((message) => {
        // Displays the promise's result and displays the amount of time that passed upon calling the function initially.
        promiseConstructorExampleElements.querySelector('h3').innerHTML = message;
        promiseConstructorExampleElements.querySelector('span').innerHTML = `Finished <br> Alarm function finished in ${Date.now() - time} milliseconds.`;
    }).catch((error) => { // If the promise fails for any reason, the catch handlers are ran.
        // Displays the promise's error message and displays the amount of time that passed upon calling the function initially.
        promiseConstructorExampleElements.querySelector('h3').innerHTML = `Could not set the alarm: ${error}`;
        promiseConstructorExampleElements.querySelector('span').innerHTML = `Failed <br> Alarm function failed after ${Date.now() - time} milliseconds.`;
    })

    // Note that the error handling is now done through the actual promise function and .catch handler, instead of adding the delay value checking 
    // in the eventListener, I was able to forgo doing so since the promise itself now checks and passes an error if needed.
}

function loadEventListeners() {
    // Creates a node list of the button elements from the initialTimeOutTest div.
    let initialTimeoutTestButtons = initialTimeoutTestElements.querySelectorAll('button');
    // Initializes the eventListeners for the initialTimeoutTest example.
    initialTimeoutTestButtons[0].addEventListener('click', () => {
        // Checks if the value in the input is a positive value.
        if (initialTimeoutTestElements.querySelector('input').value > 0) {
            // If so, calls the function to activate the initialTimeoutTest and passes in a delay value in seconds.
            initialTimeoutTest(initialTimeoutTestElements.querySelector('input').value * 1000);
        } else {
            // If not, pop up an error alerting the user.
            alert("Please enter a positive value for the delay.")
        }
    })
    initialTimeoutTestButtons[1].addEventListener('click', () => {
        // Clears all display elements back to empty or their starting values.
        initialTimeoutTestElements.querySelector('span').innerHTML = `Not Started`;
        initialTimeoutTestElements.querySelector('h6').innerHTML = ``;
        initialTimeoutTestElements.querySelector('input').value = ``;
    })

    // Creates a node list of the button elements from the promiseConstructorExample div.
    let promiseConstructorExampleButtons = promiseConstructorExampleElements.querySelectorAll('button');
    // Initializes the eventListeners for the promiseConstructorExample.
    promiseConstructorExampleButtons[0].addEventListener('click', () => {
        // Creates a node list of all the input elements from the promiseConstructorExample div.
        let inputs = promiseConstructorExampleElements.querySelectorAll('input');
        // Calls the promiseConstructorExample with the values from the various user inputs.
        promiseConstructorExample(inputs[0].value * 1000, inputs[1].value)
    })
    promiseConstructorExampleButtons[1].addEventListener('click', () => {
        // Clears all display and input elements back to empty or their starting values.
        promiseConstructorExampleElements.querySelector('span').innerHTML = `Not Started`;
        promiseConstructorExampleElements.querySelector('h3').innerHTML = ``;
        promiseConstructorExampleElements.querySelectorAll('input').forEach((input) => input.value = ``);
    })
}

loadEventListeners()