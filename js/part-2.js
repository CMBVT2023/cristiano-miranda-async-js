// Initializes all of the HTML Elements
const fetchRequestExampleElements = document.getElementById('fetch-request-example');
const promiseChainingExampleElements = document.getElementById('promise-chaining-example');

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
        // Iterates through each item in the returned array
        data.forEach((item) => {
            // Appends a new list item to the ordered list element in the div containing each item's name.
            promiseChainingExampleElements.querySelector('ol').innerHTML += `<li>Name: ${item.name}</li>`;
        })
        promiseChainingExampleElements.querySelector('span').innerHTML = `Received <br>
            Fetch Request Finished in ${Date.now() - time} milliseconds`;
    });


    // Selects the h6 element from the div container and displays the time it took for the function to finish executing.
    promiseChainingExampleElements.querySelector('h6').innerHTML = `Function finished executing in ${Date.now() - time} milliseconds`
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
}

// Calls the function to load the default event listeners.
loadEventListeners();