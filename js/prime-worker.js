// Initializes a global eventListener that will trigger once the "message" event is triggered
// The message event gets triggered once the main page uses the .postMessage() method on the worker.
// Within the method a "message" object is passed through containing the command name, in this case "generate",
// and any other data parameters required, in this case the number of primes to generate, num.
addEventListener("message", (message) => {
    // Checks the value of the command key.
    if (message.data.command === "generate") {
        // If the value equates to generate,
        // Calls the function to generate primes and passes in the num key.
        generatePrimesAsynchronous(message.data.num);
    }
});

// Generates a certain amount of prime numbers based on the num passed in.
function generatePrimesAsynchronous(num) {
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
    
    // Calls postMessage and returns the length of the primes array.
    // This will trigger the "message" event on the main page and any information passed within it will
    // allow the main page to have access to it.
    postMessage(primes.length);
}