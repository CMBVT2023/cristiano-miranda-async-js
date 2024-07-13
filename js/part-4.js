const generatingPrimesExampleElements = document.getElementById('generating-primes-example');
const localStoragePracticeElements = document.getElementById('local-storage-practice-example');

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

// Local Storage Practice Example.
function localStoragePractice(type, obj) {
    const localStorageWorker = new Worker('../js/local-storage-worker.js');

    // Focus on learning how to use multiple commands from one worker with this example,
    if (type == 1) {
        localStorageWorker.postMessage({command: "add", obj});
    } else if (type == 2) {
        localStorageWorker.postMessage({command: "remove"});
    } else if (type == 3) {
        localStorageWorker.postMessage({command: "remove-all"});
    }
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
}

loadEventListeners();