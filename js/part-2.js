// Initializes all of the HTML Elements
const fetchRequestExampleElements = document.getElementById('fetch-request-example');
const promiseChainingExampleElements = document.getElementById('promise-chaining-example');
const failedFetchRequestExampleElements = document.getElementById('failed-fetch-request-example');
const fetchCatchExampleElements = document.getElementById('fetch-catch-example');
const multipleFetchingExampleElements = document.getElementById('multiple-fetching-example');
const anyValidFetchExampleElements = document.getElementById('fetching-any-check-example');
const asyncAndAwaitExampleElements = document.getElementById('async-and-await-example');
const asyncErrorCatchingExampleElements = document.getElementById('async-error-catching-example');


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

// Fetch Catch Example
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
    }).catch((error) => {
        // If not, the span is selected from the div to show the time it took for the failed promise to execute.
        fetchCatchExampleElements.querySelector('span').innerHTML = `Function failed but finished executing in ${Date.now() - time} milliseconds`;

        // Opens a new alert to display the error.
        alert(`HTTP Error: ${error}`);

        // Logs the resulting error to the console.
        console.error(`Could not get products: ${error}`);
    });

    // Selects the h6 element from the div container and displays the time it took for the function to finish executing.
    fetchCatchExampleElements.querySelector('h6').innerHTML = `Function finished executing in ${Date.now() - time} milliseconds`;
}

// Multiple Fetching Example
function multipleFetchingExample(link) {
    // Saves the time a which the function first starts executing.
    let time = Date.now()

    // Clears the h6 and ol elements before appending items to them.
    multipleFetchingExampleElements.querySelector('h6').innerHTML = ``;
    multipleFetchingExampleElements.querySelector('ol').innerHTML = ``;

    // Initializes multiple promises using the fetch API.
    const fetchPromiseOne = fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",);
    const fetchPromiseTwo = fetch(link,);
    const fetchPromiseThree = fetch("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",);

    // Initializes a promise check that will trigger a callback only if all of the promises succeed.
    Promise.all([fetchPromiseOne, fetchPromiseTwo, fetchPromiseThree]).then((responses) => { // Takes the result of the promise and reads the body text from it.
        multipleFetchingExampleElements.querySelector('span').innerHTML = `Finished`;
        for (const response of responses) {
            multipleFetchingExampleElements.querySelector('h6').innerHTML += `First promise finished executing in ${Date.now() - time} milliseconds. <br>`
            multipleFetchingExampleElements.querySelector('ol').innerHTML += `<li>${response.url}: ${response.status}</li>`
            console.log(`${response.url}: ${response.status}`);
        }
    }).catch((error) => { // Triggers if any of the promises fail.
        // If there is an error the span is selected from the div to show the time it took for the failed promise to execute.
        multipleFetchingExampleElements.querySelector('span').innerHTML = `Function failed but finished executing in ${Date.now() - time} milliseconds`;

        // Opens a new alert to display the error.
        alert(`HTTP Error: ${error}`);

        // Logs the resulting error to the console.
        console.error(`Failed to fetch: ${error}`);
    })
}

// Any Valid Fetch Example
function anyValidFetchExample(link) {
    // Saves the time a which the function first starts executing.
    let time = Date.now()

    // Clears the h6 and ol elements before appending items to them.
    anyValidFetchExampleElements.querySelector('h6').innerHTML = ``;
    anyValidFetchExampleElements.querySelector('ol').innerHTML = ``;

    // Initializes multiple promises using the fetch API.
    const fetchPromiseOne = fetch(link,);
    const fetchPromiseTwo = fetch(link,);
    const fetchPromiseThree = fetch(link,);

    // Initializes a promise check that will trigger a callback if any one of the promises succeed.
    Promise.any([fetchPromiseOne, fetchPromiseTwo, fetchPromiseThree]).then((response) => { // Takes the result of the promise and reads the body text from it.
        anyValidFetchExampleElements.querySelector('span').innerHTML = `Finished`;
        anyValidFetchExampleElements.querySelector('h6').innerHTML += `First promise finished executing in ${Date.now() - time} milliseconds. <br>`
        anyValidFetchExampleElements.querySelector('ol').innerHTML += `<li>${response.url}: ${response.status}</li>`
        console.log(`${response.url}: ${response.status}`);
    }).catch((error) => { // Triggers if all of the promises fail.
        // If there is an error the span is selected from the div to show the time it took for the failed promise to execute.
        anyValidFetchExampleElements.querySelector('span').innerHTML = `Function failed but finished executing in ${Date.now() - time} milliseconds`;

        // Opens a new alert to display the error.
        alert(`HTTP Error: ${error}`);

        // Logs the resulting error to the console.
        console.error(`Failed to fetch: ${error}`);
    })
}

// Async and Await Example
async function asyncAndAwaitExample(link) {
    // Saves the time a which the function first starts executing.
    let time = Date.now()

    // Declares a try and catch statement, 
    // The code will attempt to run and execute normally, whats in the try statement, but if any error occurs, the catch statement
    // will be triggered and execute, which will display the error that occurred in the various display elements.
    try {
        // Clears the unordered list display element.
        asyncAndAwaitExampleElements.querySelector('ul').innerHTML = ``

        // Appends the starting time of the first fetch request.
        asyncAndAwaitExampleElements.querySelector('ul').innerHTML += `First Fetch Started after ${Date.now() - time} milliseconds.`;

        // Initializes a response variable to store the result of the fetch statement, the code will wait until this request is completed
        // before moving to the next line of code.
        const response = await fetch(link,);

        // Appends the time passed for the first fetch request.
        asyncAndAwaitExampleElements.querySelector('ul').innerHTML += `First Fetch Finished after ${Date.now() - time} milliseconds.`;
        
        // Checks if the response to the fetch request is valid.
        if (!response.ok) {
            // If not, it will display the error to the user in an alert popup and in the various display elements.
            alert(`HTTP error: ${response.status}`);
            asyncAndAwaitExampleElements.querySelector('span').innerHTML = `Error`
            asyncAndAwaitExampleElements.querySelector('h6').innerHTML = ``
            asyncAndAwaitExampleElements.querySelector('ol').innerHTML = ``
            throw new Error(`HTTP error: ${response.status}`);
        }
        
        // Appends the starting time of the first fetch request.
        asyncAndAwaitExampleElements.querySelector('ul').innerHTML += `Second Fetch Started after ${Date.now() - time} milliseconds.`;

        // Initializes a variable to store the data from the response, and the await keyword will cause the program to wait until the response.json()
        // request is completed. Once the json object is parsed and stored in the data object, it will continue to the next line of code.
        const data = await response.json();

        // Appends the time passed for the first fetch request.
        asyncAndAwaitExampleElements.querySelector('ul').innerHTML += `Second Fetch Finished after ${Date.now() - time} milliseconds.`;

        // Logs the first item's name in from the data object to the console.
        console.log(data[0].name);

        // Clears the list display element.
        asyncAndAwaitExampleElements.querySelector('ol').innerHTML = ``

        // Iterates through all items in the data object and displays their name in the list display element.
        for (const item in data) {
            asyncAndAwaitExampleElements.querySelector('ol').innerHTML += `<li>${data[item].name}</li>`
        }

        // Displays the response's status in the associated display element.
        asyncAndAwaitExampleElements.querySelector('span').innerHTML = `Finished <br> ${response.status}`

        asyncAndAwaitExampleElements.querySelector('h6').innerHTML = `Function finished executing in ${Date.now() - time} milliseconds`
    } catch (error) {
        // If an error occurs, like the link is bad, then the various display elements will display the resulting error.
        asyncAndAwaitExampleElements.querySelector('span').innerHTML = `Error`
        asyncAndAwaitExampleElements.querySelector('h6').innerHTML = `${error}`
        asyncAndAwaitExampleElements.querySelector('ol').innerHTML = ``
        console.error(`Could not get products: ${error}`);
    }
}

// Async Error Catching Example
// // Note that for this example, the try and catch statement could be included in the async function but in this case having the catch on the returned promise works as well, and it allows the .then
// // handler to not have to deal with any errors that are thrown. If the try and catch were implemented it would have to be in the async function since the await keyword needed in the try catch
// // statement only works inside of a async function.
function asyncErrorCatchingExample(link) {
    // Saves the time a which the function first starts executing.
    let time = Date.now()

    // Clears the unordered list display element.
    asyncErrorCatchingExampleElements.querySelector('ul').innerHTML = ``

    // Declares a async function that creates fetch requests and halts the code execution until they receive a response. 
    async function fetchProduct(link, time) {
        // Appends the starting time of the first fetch request.
        asyncErrorCatchingExampleElements.querySelector('ul').innerHTML += `First Fetch Started after ${Date.now() - time} milliseconds.`;

        // Initializes a variable to store a fetch request and halts code execution until a response is received.
        const response = await fetch(link,);

        // Appends the amount of time needed to complete the first fetch request.
        asyncErrorCatchingExampleElements.querySelector('ul').innerHTML += `First Fetch finished after ${Date.now() - time} milliseconds.`;

        // Checks if the response to the fetch request is valid.
        if (!response.ok) {
            // If not, it will display the error to the user in an alert popup and in the various display elements.
            alert(`HTTP error: ${response.status}`);
            asyncErrorCatchingExampleElements.querySelector('span').innerHTML = `Error`
            asyncErrorCatchingExampleElements.querySelector('h6').innerHTML = ``
            asyncErrorCatchingExampleElements.querySelector('ol').innerHTML = ``
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Appends the starting time of the first fetch request.
        asyncErrorCatchingExampleElements.querySelector('ul').innerHTML += `Second Fetch Started after ${Date.now() - time} milliseconds.`;

        // Initializes a variable to store a fetch request for the JSON object from the response variable. All code execution
        // is halted until a response is received.
        const data = await response.json();

        // Appends the amount of time needed to complete the first fetch request.
        asyncErrorCatchingExampleElements.querySelector('ul').innerHTML += `Second Fetch finished after ${Date.now() - time} milliseconds.`;

        asyncErrorCatchingExampleElements.querySelector('span').innerHTML = `Finished <br> ${response.status}`;

        // Returns the data object.
        return data
    }

    // Initializes a promise variable to store the results of the async fetch function. 
    const promise = fetchProduct(link, time);

    // The return from the function is a promise, so to access the data it has to be done using the .then() and .catch() methods
    // on the promise.
    promise.then((data) => { // if the promise is successful.
        // Logs the first item from the data object
        console.log(data[0].name);
        
        // Clears the list display element.
        asyncErrorCatchingExampleElements.querySelector('ol').innerHTML = '';

        // Iterates through the data object and appends each item's name to the list display element.
        for (const item in data) {
            asyncErrorCatchingExampleElements.querySelector('ol').innerHTML += `<li>${data[item].name}</li>`;
        }
    }).catch((error) => {
        // If an error occurs, like the link is bad, then the various display elements will display the resulting error.
        asyncErrorCatchingExampleElements.querySelector('span').innerHTML = `Error`
        asyncErrorCatchingExampleElements.querySelector('h6').innerHTML = `${error}`
        asyncErrorCatchingExampleElements.querySelector('ol').innerHTML = ``
        console.error(`Could not get products: ${error}`);
    })

    asyncErrorCatchingExampleElements.querySelector('h6').innerHTML = `Function finished executing after ${Date.now() - time} milliseconds.`
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

    // Creates a node list for all of the buttons in the Multiple Fetching Example.
    let multipleFetchingButtons = multipleFetchingExampleElements.querySelectorAll('button');
    // Initializes a string to store the link for the multipleFetchingExample.
    let multipleFetchingLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found";
    // Initializes all of the eventListeners for the Multiple Fetching Example.
    multipleFetchingButtons[0].addEventListener('click', () => {
        multipleFetchingExample(multipleFetchingLink);
    })
    multipleFetchingButtons[1].addEventListener('click', () => {
        if (multipleFetchingExampleElements.querySelector('strong').innerHTML === "Working") {
            // If the link is currently correct, it will be swapped for a broken link.
            multipleFetchingLink = "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found";
            console.log("Current Link Test: " + fetchCatchLink)
            multipleFetchingExampleElements.querySelector('strong').innerHTML = "Broken"
        } else {
            // If the link is currently broken, it will be swapped for the correct link.
            fetchCatchLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
            console.log("Current Link Test: " + fetchCatchLink)
            multipleFetchingExampleElements.querySelector('strong').innerHTML = "Working"
        }
    })
    multipleFetchingButtons[2].addEventListener('click', () => {
        multipleFetchingExampleElements.querySelector('span').innerHTML = `Not Started`;
        multipleFetchingExampleElements.querySelector('ol').innerHTML = ``;
        multipleFetchingExampleElements.querySelector('h6').innerHTML = ``;
    })

    // Creates a node list for all of the buttons in the Any Valid Fetch Example.
    let anyValidFetchButtons = anyValidFetchExampleElements.querySelectorAll('button');
    // Initializes a string to store the link for the Any Valid Fetch Example.
    let anyValidFetchLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found";
    // Initializes all of the eventListeners for the Any Valid Fetch Example.
    anyValidFetchButtons[0].addEventListener('click', () => {
        anyValidFetchExample(anyValidFetchLink);
    })
    anyValidFetchButtons[1].addEventListener('click', () => {
        if (anyValidFetchExampleElements.querySelector('strong').innerHTML === "Working") {
            // If the link is currently correct, it will be swapped for a broken link.
            anyValidFetchLink = "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found";
            console.log("Current Link Test: " + anyValidFetchLink)
            anyValidFetchExampleElements.querySelector('strong').innerHTML = "Broken"
        } else {
            // If the link is currently broken, it will be swapped for the correct link.
            anyValidFetchLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
            console.log("Current Link Test: " + anyValidFetchLink)
            anyValidFetchExampleElements.querySelector('strong').innerHTML = "Working"
        }
    })
    anyValidFetchButtons[2].addEventListener('click', () => {
        anyValidFetchExampleElements.querySelector('span').innerHTML = `Not Started`;
        anyValidFetchExampleElements.querySelector('ol').innerHTML = ``;
        anyValidFetchExampleElements.querySelector('h6').innerHTML = ``;
    })

    // Creates a node list for all of the buttons in the Async and Await Example.
    let asyncAndAwaitButtons = asyncAndAwaitExampleElements.querySelectorAll('button');
    // Initializes a string to store the link for the Async and Await Example.
    let asyncAndAwaitLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    // Initializes all of the eventListeners for the Async and Await Example.
    asyncAndAwaitButtons[0].addEventListener('click', () => {
        asyncAndAwaitExample(asyncAndAwaitLink);
    })
    asyncAndAwaitButtons[1].addEventListener('click', () => {
        if (asyncAndAwaitExampleElements.querySelector('strong').innerHTML == "Working") {
            asyncAndAwaitLink = "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
            asyncAndAwaitExampleElements.querySelector('strong').innerHTML = "Broken"
            console.log(`Current Link: ${asyncAndAwaitLink}`);
        } else if (asyncAndAwaitExampleElements.querySelector('strong').innerHTML == "Broken") {
            asyncAndAwaitLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
            asyncAndAwaitExampleElements.querySelector('strong').innerHTML = "Working"
            console.log(`Current Link: ${asyncAndAwaitLink}`);
        }
    })
    asyncAndAwaitButtons[2].addEventListener('click', () => {
        asyncAndAwaitExampleElements.querySelector('span').innerHTML = `Not Started`;
        asyncAndAwaitExampleElements.querySelector('h6').innerHTML = ``;
        asyncAndAwaitExampleElements.querySelector('ol').innerHTML = ``;
        asyncAndAwaitExampleElements.querySelector('ul').innerHTML = ``;
    })

    // Creates a node list for all of the buttons in the Async Error Catching Example.
    let asyncErrorCatchingButtons = asyncErrorCatchingExampleElements.querySelectorAll('button');
    // Initializes a string to store the link for the Async Error Catching Example.
    let asyncErrorCatchingLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
    // Initializes all of the eventListeners for the Async Error Catching Example.
    asyncErrorCatchingButtons[0].addEventListener('click', () => {
        asyncErrorCatchingExample(asyncErrorCatchingLink);
    })
    asyncErrorCatchingButtons[1].addEventListener('click', () => {
        if (asyncErrorCatchingExampleElements.querySelector('strong').innerHTML == "Working") {
            asyncErrorCatchingLink = "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
            asyncErrorCatchingExampleElements.querySelector('strong').innerHTML = "Broken"
            console.log(`Current Link: ${asyncErrorCatchingLink}`);
        } else if (asyncErrorCatchingExampleElements.querySelector('strong').innerHTML == "Broken") {
            asyncErrorCatchingLink = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
            asyncErrorCatchingExampleElements.querySelector('strong').innerHTML = "Working"
            console.log(`Current Link: ${asyncErrorCatchingLink}`);
        }
    })
    asyncErrorCatchingButtons[2].addEventListener('click', () => {
        asyncErrorCatchingExampleElements.querySelector('span').innerHTML = `Not Started`;
        asyncErrorCatchingExampleElements.querySelector('h6').innerHTML = ``;
        asyncErrorCatchingExampleElements.querySelector('ol').innerHTML = ``;
        asyncErrorCatchingExampleElements.querySelector('ul').innerHTML = ``;
    })
}

// Calls the function to load the default event listeners.
loadEventListeners();