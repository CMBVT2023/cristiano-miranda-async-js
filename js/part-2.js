// Initializes all of the HTML Elements
const fetchRequestExampleElements = document.getElementById('fetch-request-example');
const promiseChainingExampleElements = document.getElementById('promise-chaining-example');
const failedFetchRequestExampleElements = document.getElementById('failed-fetch-request-example');
const fetchCatchExampleElements = document.getElementById('fetch-catch-example');

// Fetch Request Example
function fetchRequestExample() {
    // Saves the time a which the function first starts executing.
    let time = Date.now()

    // Initializes a new fetch request to the json file stored on github.
    const fetchPromise = fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",);

    // Logs the fetch request to console.
    console.log(fetchPromise);

    // Initializes a then callback on the fetch request.
    fetchPromise.then((response) => {
        // Initializes a new callback on the text body.
        // // This promise returns a string, and this method requires using the callback within a callback method.
        // // There is a better way to code this as shown in the next example.
        response.text().then((text) => {
            // Takes the string returned by the promise and sets parses the response,
            // A variable is also initialized to store the result.
            let list = JSON.parse(text)
            
            // Logs the new list to the console.
            console.log(list);

            // Selects the span element and displays the result of the fetch request to its innerHTML.
            fetchRequestExampleElements.querySelector('span').innerHTML = `Received <br>
            Result: ${response.status} <br>
            Received Object Length: ${list.length} <br>
            Fetch Request Finished in ${Date.now() - time} milliseconds`;
        })
    })


    // Selects the h6 element from the div container and displays the time it took for the function to finish executing.
    fetchRequestExampleElements.querySelector('h6').innerHTML = `Function finished executing in ${Date.now() - time} milliseconds`
}

// Promise Chaining Example
function promiseChainingExample() {
    // Saves the time a which the function first starts executing.
    let time = Date.now()

    // Initializes a new fetch request to the json file stored on github.
    const fetchPromise = fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",);

    // Logs the fetch request to console.
    console.log(fetchPromise);

    // Initializes a then callback on the fetch request, that response's json method is called, and then a new callback is initialized
    // on the response which then executes a callback.
    // // This code is much easier to read and troubleshoot since the second callback method is called outside of the first
    // // call back method, which removes the need for nested callbacks.
    fetchPromise.then((response) => response.json()).then((data) => {
        // Logs the returned array to the console.
        console.log(data);

        // Clears the list display element.
        promiseChainingExampleElements.querySelector('ol').innerHTML = ``;

        // Iterates through each item in the returned array
        data.forEach((item) => {
            // Appends a new list item to the ordered list element in the div containing each item's name.
            promiseChainingExampleElements.querySelector('ol').innerHTML += `<li>Name: ${item.name}</li>`;
        })

        // Selects the span element from the div container and displays the amount of time it took for the promise to finish executing.
        promiseChainingExampleElements.querySelector('span').innerHTML = `Received <br>
            Fetch Request Finished in ${Date.now() - time} milliseconds`;
    });


    // Selects the h6 element from the div container and displays the time it took for the function to finish executing.
    promiseChainingExampleElements.querySelector('h6').innerHTML = `Function finished executing in ${Date.now() - time} milliseconds`
}

// Failed Fetch Request Example
function failedFetchRequestExample(http) {
    // Saves the time a which the function first starts executing.
    let time = Date.now()

    // Initializes a new fetch request to the json file stored on github.
    const fetchPromise = fetch(http,);

    // Logs the fetch request to console.
    console.log(fetchPromise);

    // Initializes a then callback on the promise.
    fetchPromise.then((response) => {
        // Checks if the response from the promise is valid.
        if (!response.ok) {
            // If not, the span is selected from the div to show the time it took for the failed promise to execute.
            failedFetchRequestExampleElements.querySelector('span').innerHTML = `Function failed but finished executing in ${Date.now() - time} milliseconds`;

            // Opens a new alert to display the error.
            alert(`HTTP Error: ${response.status}`);

            // Throws a http error, and note that doing this prevents any line of code from running afterwards, treat these like a return statement.
            throw new Error(`HTTP error: ${response.status}`);
        }
        // Returns the result of the promise's body after parsing it with JSON.
        return response.json();
    }).then((data) => { // Takes the result of the promise and reads the body text from it.
        // Logs the returned array to the console.
        console.log(data);

        // Clears the list display element.
        failedFetchRequestExampleElements.querySelector('ol').innerHTML = ``;
        
        // Iterates through each item in the returned array
        data.forEach((item) => {
            // Appends a new list item to the ordered list element in the div containing each item's name.
            failedFetchRequestExampleElements.querySelector('ol').innerHTML += `<li>Name: ${item.name}</li>`;
        })
        // Selects the span element from the div container and displays the amount of time it took for the promise to finish executing.
        failedFetchRequestExampleElements.querySelector('span').innerHTML = `Received <br>
            Fetch Request Finished in ${Date.now() - time} milliseconds`;
    })

    // Selects the h6 element from the div container and displays the time it took for the function to finish executing.
    failedFetchRequestExampleElements.querySelector('h6').innerHTML = `Function finished executing in ${Date.now() - time} milliseconds`;
}

// Fetch Catch Example, add the .catch feature to this problem, after the second .then promise method.
function fetchCatchExample(http) {
    // Saves the time a which the function first starts executing.
    let time = Date.now()

    // Initializes a new fetch request to the json file stored on github.
    const fetchPromise = fetch(http,);

    // Logs the fetch request to console.
    console.log(fetchPromise);

    // Initializes a then callback on the promise.
    fetchPromise.then((response) => {
        // Checks if the response from the promise is valid.
        if (!response.ok) {
            // If not, the span is selected from the div to show the time it took for the failed promise to execute.
            fetchCatchExampleElements.querySelector('span').innerHTML = `Function failed but finished executing in ${Date.now() - time} milliseconds`;

            // Opens a new alert to display the error.
            alert(`HTTP Error: ${response.status}`);

            // Throws a http error, and note that doing this prevents any line of code from running afterwards, treat these like a return statement.
            throw new Error(`HTTP error: ${response.status}`);
        }
        // Returns the result of the promise's body after parsing it with JSON.
        return response.json();
    }).then((data) => { // Takes the result of the promise and reads the body text from it.
        // Logs the returned array to the console.
        console.log(data);

        // Clears the list display element.
        fetchCatchExampleElements.querySelector('ol').innerHTML = ``;
        
        // Iterates through each item in the returned array
        data.forEach((item) => {
            // Appends a new list item to the ordered list element in the div containing each item's name.
            fetchCatchExampleElements.querySelector('ol').innerHTML += `<li>Name: ${item.name}</li>`;
        })
        // Selects the span element from the div container and displays the amount of time it took for the promise to finish executing.
        failedFetchRequestExampleElements.querySelector('span').innerHTML = `Received <br>
            Fetch Request Finished in ${Date.now() - time} milliseconds`;
    })

    // Selects the h6 element from the div container and displays the time it took for the function to finish executing.
    fetchCatchExampleElements.querySelector('h6').innerHTML = `Function finished executing in ${Date.now() - time} milliseconds`;
}

// Loads all of the default eventListeners for the web page.
function loadEventListeners() {
    // Creates a node list for all of the buttons in the fetchRequestExample.
    let fetchRequestButtons = fetchRequestExampleElements.querySelectorAll('button');
    // Initializes the default eventListeners for the fetchRequestExample.
    fetchRequestButtons[0].addEventListener('click', () => {
        fetchRequestExample();
    })
    fetchRequestButtons[1].addEventListener('click', () => {
        fetchRequestExampleElements.querySelector('h6').innerHTML = ``;
        fetchRequestExampleElements.querySelector('span').innerHTML = `Not Started`;
    })

    // Creates a node list for all of the buttons in the promiseChainingExample.
    let promiseChainingButtons = promiseChainingExampleElements.querySelectorAll('button');
    // Initializes the default eventListeners for the promiseChainingExample.
    promiseChainingButtons[0].addEventListener('click', () => {
        promiseChainingExample();
    })
    promiseChainingButtons[1].addEventListener('click', () => {
        promiseChainingExampleElements.querySelector('h6').innerHTML = ``;
        promiseChainingExampleElements.querySelector('span').innerHTML = `Not Started`;
        promiseChainingExampleElements.querySelector('ol').innerHTML = ``;
    })

    // Creates a node list for all of the buttons in the failedFetchRequestExample.
    let failedFetchRequestButtons = failedFetchRequestExampleElements.querySelectorAll('button');
    // Initializes a string to store the link for the failedFetchRequestExample.
    let failedFetchRequestLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";
    // Initializes the default eventListeners for the failedFetchRequestExample.
    failedFetchRequestButtons[0].addEventListener('click', () => {
        failedFetchRequestExample(failedFetchRequestLink);
    })
    failedFetchRequestButtons[1].addEventListener('click', () => {
        // Checks the current status of the fetchRequestLink
        if (failedFetchRequestExampleElements.querySelector('strong').innerHTML === "Working") {
            // If the link is currently correct, it will be swapped for a broken link.
            failedFetchRequestLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json+"
            console.log("Current Link Test: " + failedFetchRequestLink)
            failedFetchRequestExampleElements.querySelector('strong').innerHTML = "Broken"
        } else {
            // If the link is currently broken, it will be swapped for the correct link.
            failedFetchRequestLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
            console.log("Current Link Test: " + failedFetchRequestLink)
            failedFetchRequestExampleElements.querySelector('strong').innerHTML = "Working"
        }
    })
    failedFetchRequestButtons[2].addEventListener('click', () => {
        failedFetchRequestExampleElements.querySelector('span').innerHTML = "Not Started"
        failedFetchRequestExampleElements.querySelector('h6').innerHTML = "";
        failedFetchRequestExampleElements.querySelector('ol').innerHTML = "";
    })

    // Creates a node list for all of the buttons in the failedFetchRequestExample.
    let fetchCatchButtons = fetchCatchExampleElements.querySelectorAll('button');
    // Initializes a string to store the link for the failedFetchRequestExample.
    let fetchCatchLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";
    // Initializes the default eventListeners for the failedFetchRequestExample.
    fetchCatchButtons[0].addEventListener('click', () => {
        fetchCatchExample(fetchCatchLink);
    })
    fetchCatchButtons[1].addEventListener('click', () => {
        // Checks the current status of the fetchRequestLink
        if (fetchCatchExampleElements.querySelector('strong').innerHTML === "Working") {
            // If the link is currently correct, it will be swapped for a broken link.
            fetchCatchLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json+"
            console.log("Current Link Test: " + fetchCatchLink)
            fetchCatchExampleElements.querySelector('strong').innerHTML = "Broken"
        } else {
            // If the link is currently broken, it will be swapped for the correct link.
            fetchCatchLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
            console.log("Current Link Test: " + fetchCatchLink)
            fetchCatchExampleElements.querySelector('strong').innerHTML = "Working"
        }
    })
    fetchCatchButtons[2].addEventListener('click', () => {
        fetchCatchExampleElements.querySelector('span').innerHTML = "Not Started"
        fetchCatchExampleElements.querySelector('h6').innerHTML = "";
        fetchCatchExampleElements.querySelector('ol').innerHTML = "";
    })
}

// Calls the function to load the default event listeners.
loadEventListeners();