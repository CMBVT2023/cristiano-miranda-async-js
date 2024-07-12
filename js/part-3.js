// Initializes all of the html elements from the webpage.
const initialTimeoutTestElements = document.getElementById('initial-timeout-test');
const promiseConstructorExampleElements = document.getElementById('promise-constructor-example');
const asyncAwaitPromiseVariationElements = document.getElementById('async-await-promise-variation');
const promiseChainingExampleElements = document.getElementById('promise-chaining-example');

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

    // Initializes a new function that takes in a time value and a name value and returns a string.
    function alarm(name, delay) {
        // Returns a new promise
        return new Promise((resolve, reject) => {
            // If the delay value passed in is less than 0, it throws an error.
            if (delay < 0) {
                throw new Error("Alarm delay must not be negative!");
            }
            // Starts a timeOut that will trigger after the specified amount of time passed, based on the passed in value,
            // and once said time elapses the promise is resolve parameter stores the string before the promise is returned.
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

// AsyncAwaitPromiseVariation
async function asyncAwaitPromiseVariation(delay, name) {
    // Stores the time at which the function first runs.
    let time = Date.now();

    // Initializes a new function that takes in a time value and a name value and returns a string.
    function alarm(name, delay) {
        // Returns a new promise
        return new Promise((resolve, reject) => {
            // If the delay value passed in is less than 0, it throws an error.
            if (delay < 0) {
                throw new Error("Alarm delay must not be negative!");
            }
            // Starts a timeOut that will trigger after the specified amount of time passed, based on the passed in value,
            // and once said time elapses the promise is resolve parameter stores the string before the promise is returned.
            setTimeout(() => {
                resolve(`Wake up, ${name}!`);
            }, delay);
        });
    }

    // Displays the initial time it took to call the alarm function.
    asyncAwaitPromiseVariationElements.querySelector('span').innerHTML = `Active <br> Alarm function called in ${Date.now() - time} milliseconds.`;

    // In this example, the use of async and await take place of the promise and its .then and .catch handlers. Instead, try and catch are used
    // and the message variable is told to wait for the response from the alarm function. 
    try {
        // Initializes a variable and calls the alarm function, the await keyword tells the code to wait until it receives a response before continuing
        // to execute code.
        const message = await alarm(name, delay);
        // Displays the response message and the time it took to receive it in the various display elements.
        asyncAwaitPromiseVariationElements.querySelector('h3').innerHTML = message;
        asyncAwaitPromiseVariationElements.querySelector('span').innerHTML = `Finished <br> Alarm function finished in ${Date.now() - time} milliseconds.`;
    } catch (error) { // In the case of any errors.
        // Displays the error message and the time that passed before the function failed.
        asyncAwaitPromiseVariationElements.querySelector('h3').innerHTML = `Could not set alarm: ${error}`;
        asyncAwaitPromiseVariationElements.querySelector('span').innerHTML = `Failed <br> Alarm function failed in ${Date.now() - time} milliseconds.`;
    }
}

function promiseChainingExample(delay, name, type) {
    // Stores the time at which the function first runs.
    let time = Date.now();

    // Initializes a new function that takes in a time value and a name value and returns a string.
    function alarm(delay, name) {
        // Returns a new promise
        return new Promise((resolve, reject) => {
            // If the delay value passed in is less than 0, it throws an error.
            if (delay < 0) {
                throw new Error("Alarm delay must not be negative!");
            }
            // Starts a timeOut that will trigger after the specified amount of time passed, based on the passed in value,
            // and once said time elapses the promise is resolve parameter stores the string before the promise is returned.
            setTimeout(() => {
                resolve(`Wake up, ${name}! <br> Delay: ${delay}.`);
            }, delay);
        });
    }

    // Displays the initial time it took to call the alarm function.
    promiseChainingExampleElements.querySelector('span').innerHTML = `Active <br> Alarm function called in ${Date.now() - time} milliseconds.`;

    // Initializes an array to store the three promise requests.
    let alarms = []

    // Initializes new promise requests and appends them to the array.
    let alarmOne = alarm(delay, name);
    let alarmTwo = alarm(delay + 2000, name);
    let alarmThree = alarm(delay + 4000, name);
    alarms.push(alarmOne, alarmTwo, alarmThree);

    if (type) {
        // Calls the .all() method to trigger only once all promises above complete.
        Promise.all(alarms).then((responses) => {
            // Clears the display list element
            promiseChainingExampleElements.querySelector('ul').innerHTML = ``; 
            // Iterates through all responses and appends them to the display list element.
            responses.forEach((item) => {
                promiseChainingExampleElements.querySelector('ul').innerHTML += `<li>${item}, finished after ${Date.now() - time} milliseconds.</li>`;
            })
            // Displays the final time it took to call the alarm functions.
            promiseChainingExampleElements.querySelector('h6').innerHTML = `Alarm functions finished in ${Date.now() - time} milliseconds.`;
        }).catch((error) => { // If any error occurs,
            // Logs the error to the console, and displays it in the display element.
            console.error(`Failed to run alarms, ${error}`);
            promiseChainingExampleElements.querySelector('h6').innerHTML = `Failed, Alarm functions failed in ${Date.now() - time} milliseconds.`;
        })
    } else {
        // Calls the .any() method to trigger only one of the promises above complete.
        Promise.any(alarms).then((response) => {
            // Clears the display list element
            promiseChainingExampleElements.querySelector('ul').innerHTML = ``; 
            // Displays the returned promises;s response and appends it to the display list element.
            promiseChainingExampleElements.querySelector('ul').innerHTML += `<li>${response}, finished after ${Date.now() - time} milliseconds.</li>`;
            // Displays the final time it took to call the alarm functions.
            promiseChainingExampleElements.querySelector('h6').innerHTML = `Alarm functions finished in ${Date.now() - time} milliseconds.`;
        }).catch((error) => { // If any error occurs,
            // Logs the error to the console, and displays it in the display element.
            console.error(`Failed to run alarms, ${error}`);
            promiseChainingExampleElements.querySelector('h6').innerHTML = `Failed, Alarm functions failed in ${Date.now() - time} milliseconds.`;
        })

        // In this case, the promise only cares about the first promise it receives which will always be the shortest delay response or the first one.
        // As opposed to the .all() method which waits until all responses are received before executing, that being said. Even when the all method waits
        // they still executed one after another so even if it doesn't display them until they are all done, the first one could already
        // be finished before the third one even starts, depending on the delay value.
    }

    // Displays the final time it took to call the initial function.
    promiseChainingExampleElements.querySelector('span').innerHTML = `Finished <br> Initial function finished in ${Date.now() - time} milliseconds.`;
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

    // Creates a node list of the button elements from the asyncAwaitPromiseVariation div.
    let asyncAwaitPromiseButtons = asyncAwaitPromiseVariationElements.querySelectorAll('button');
    // Initializes all of the eventListeners for the asyncAwaitPromiseVariation example.
    asyncAwaitPromiseButtons[0].addEventListener('click', () => {
        let inputs = asyncAwaitPromiseVariationElements.querySelectorAll('input');
        // Calls the asyncAwaitVariation function.
        asyncAwaitPromiseVariation(inputs[0].value * 1000, inputs[1].value)
    })
    asyncAwaitPromiseButtons[1].addEventListener('click', () => {
        // Clears all display and inputs elements
        asyncAwaitPromiseVariationElements.querySelector('span').innerHTML = `Not Started`;
        asyncAwaitPromiseVariationElements.querySelector('h3').innerHTML = ``;
        asyncAwaitPromiseVariationElements.querySelectorAll('input').forEach((item) => item.value = ``);
    })

    // Creates a node list of the button elements from the promiseChainingExample div.
    let promiseChainingButtons = promiseChainingExampleElements.querySelectorAll('button');
    // Initializes a variable to store boolean indicator for the promise method type, true = .all() and false = .any().
    let promiseChainingType = true;
    // Initializes all of the eventListeners for the promiseChainingExample.
    promiseChainingButtons[0].addEventListener('click', () => {
        // Creates a node list of all the inputs from the promiseChainingExample div.
        let inputs = promiseChainingExampleElements.querySelectorAll('input');
        // Calls the promiseChainingExample function.
        promiseChainingExample(inputs[0].value * 1000, inputs[1].value, promiseChainingType);
    })
    promiseChainingButtons[1].addEventListener('click', () => {
        // Checks the current value set for the promiseChainingType and swaps it with its opposing value.
        if (promiseChainingType) {
            // If currently set to true, sets the value to false and shows "Any" in the display element.
            promiseChainingType = false;
            promiseChainingExampleElements.querySelector('strong').innerHTML = "Any"
            // Console logs the current type.
            console.log('Current promise type: Any');
        } else if (promiseChainingType == false) {
            // If currently set to true, sets the value to true and shows "All" in the display element.
            promiseChainingType = true;
            promiseChainingExampleElements.querySelector('strong').innerHTML = "All"
            // Console logs the current type.
            console.log('Current promise type: All');
        }
    })
    promiseChainingButtons[2].addEventListener('click', () => {
        // Clears all display and input elements.
        promiseChainingExampleElements.querySelector('h6').innerHTML = ``;
        promiseChainingExampleElements.querySelector('ul').innerHTML = ``;
        promiseChainingExampleElements.querySelector('span').innerHTML = `Not Started`;
        promiseChainingExampleElements.querySelectorAll('inputs').forEach((item) => item.value = '');
    })
}

loadEventListeners()