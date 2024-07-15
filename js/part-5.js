// Initializes all of the html elements from the webpage.
const callBackAnimationSequenceElements = document.getElementById('callBack-animation-practice');
const promiseChainingAnimationSequenceElements = document.getElementById('promise-chaining-animation-practice');
const asyncAwaitAnimationSequenceElements = document.getElementById('async-await-animation-practice');

// Initializes the basic animation effect for the alice images.
const aliceTumbling = [
    { transform: "rotate(0) scale(1)" },
    { transform: "rotate(360deg) scale(0)" }
];

// Initializes the duration for the animated effect on the alice images.
const aliceTiming = {
    duration: 2000,
    iterations: 1,
    fills: "forwards",
};

// Call Back Chaining Method.
function callBackAnimationSequence() {
    // Creates a node list of the various alice image elements and stores each image separate variables.
    let imageList = callBackAnimationSequenceElements.querySelector('#alice-container').querySelectorAll('img');
    const imageOne = imageList[0];
    const imageTwo = imageList[1];
    const imageThree = imageList[2];

    // Calls the animate method on imageOne
    let animationOne = imageOne.animate(aliceTumbling, aliceTiming);

    // Updates the display element to show which image animate is currently active.
    callBackAnimationSequenceElements.querySelector('span').innerHTML = `Image One Active`;
    
    // Waits for the promise return from the animation's finished method.
    animationOne.finished.then(() => {
        // Once the promise is returned,
        // Updates the display element to show which image animate is currently active.
        callBackAnimationSequenceElements.querySelector('span').innerHTML = `Image Two Active`;
        // Calls the animate method on imageTwo and waits for the animation's finished method to return its promise and then triggers the .then() handler.
        imageTwo.animate(aliceTumbling, aliceTiming).finished.then(() => {
            // Once the promise is return,
            // Updates the display element to show which image animate is currently active.
            callBackAnimationSequenceElements.querySelector('span').innerHTML = `Image Three Active`;

            // Calls the animate method on imageThree and waits for the animation's finished method to return its promise and then triggers the .then() handler.
            imageThree.animate(aliceTumbling, aliceTiming).finished.then(() => {
                // Once the promise is return,
                // Updates the display element to show which that all animation are finished.
                callBackAnimationSequenceElements.querySelector('span').innerHTML = `All Animations Finished`;
            }).catch((error) => { // Catches and logs any errors that occurs.
                console.error(`Error: ${error}`);
            })
            }).catch((error) => { // Catches and logs any errors that occurs.
            console.error(`Error: ${error}`);
            })
    }).catch((error) => { // Catches and logs any errors that occurs.
        console.error(`Error: ${error}`);
    })
}

// Used to trigger the Call Back Animation function.
function callBackAnimationActivation() {
    // Logs that the animation has started.
    console.log('Callback Animation Activated')
    // Calls the function to start the animation.
    callBackAnimationSequence()
    // Sets a timeout for 7 seconds.
    setTimeout(() => {
        // Reinitialize the eventListener for the callBackAnimationSequence button.
        callBackAnimationSequenceElements.querySelector('button').addEventListener('click', callBackAnimationActivation, {once:true});
        // Logs that the animations are finished.
        console.log('Callback Animation Button Reloaded');
        // Updates the display to show that the animations are not active.
        callBackAnimationSequenceElements.querySelector('span').innerHTML = `Not Active`;
    }, 7000); 
}

function promiseChainingAnimationSequence() {
    // Creates a node list of the various alice image elements and stores each image separate variables.
    let imageList = promiseChainingAnimationSequenceElements.querySelector('#alice-container').querySelectorAll('img');
    const imageOne = imageList[0];
    const imageTwo = imageList[1];
    const imageThree = imageList[2];

    // Updates the display element to show which image animate is currently active.
    promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `Image One Active`;

    // This is the most concise way of animating the sequence, instead of chaining the .then() handler within the previous one, it takes the result of the arrow function
    // and applies the then on the returned object. The only issue is that no other code can be executed within the .then() handler otherwise it would not properly next .then() handler to the 
    // finished animation object. I had to instead create a new interval timeout to update the animation display. While this method is easier to code and understand, it has limitations in what
    // can be done within the chaining. 
    
    // Attempt to use the return keyword to see if this can be fixed. This actually solve the issue so this method is better, so long as the finished image is returned this .then() chaining method
    // can be used even if other code is implemented within the arrow functions

    // Calls the animate method on each image and uses the finished method to allow the then handler to trigger the next image's animation.
    imageOne.animate(aliceTumbling, aliceTiming).finished
    .then(() => {
        // Updates the display element to show which image animate is currently active.
        promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `Image Two Active`;

        // Returns the promise from the second image's animation finishing.
        return imageTwo.animate(aliceTumbling, aliceTiming).finished})
    .then(() => {
        // Updates the display element to show which image animate is currently active.
        promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `Image Three Active`;

        // Returns the promise from the third image's animation finishing.
        return imageThree.animate(aliceTumbling, aliceTiming).finished})
    .then(() => {
        // Updates the display element to show which that all animation are finished.
        promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `All Animations Finished`
    })
    .catch(error => console.error(`Error: ${error}`)); // Catches any errors and logs them to the console.

    // // My original attempt to update the animation display using interval timeout.
    // let intervalAmount = 1;
    // let animationInterval = setInterval(() => {
    //     promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `Image ${intervalAmount + 1} Active`;
    //     intervalAmount++;
    //     if (intervalAmount == 3) {
    //         clearInterval(animationInterval)
    //     }
    // }, 2000)
}

// Used to trigger the Promise Chaining Animation function.
function promiseChainingAnimationActivation() {
    // Logs that the animation has started.
    console.log('Promise Chaining Animation Activated')
    // Calls the function to begin the animation sequence.
    promiseChainingAnimationSequence()
    // Sets a timeout for 7 seconds.
    setTimeout(() => {
        // Reinitialize the eventListener for the callBackAnimationSequence button.
        promiseChainingAnimationSequenceElements.querySelector('button').addEventListener('click', callBackAnimationActivation, {once:true});
        // Logs that the animations are finished.
        console.log('Promise Chaining Animation Button Reloaded');
        // Updates the display to show that the animations are not active.
        promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `Not Active`;
    }, 7000); 
}


async function asyncAwaitAnimationSequence() {
    // Creates a node list of the various alice image elements and stores each image separate variables.
    let imageList = asyncAwaitAnimationSequenceElements.querySelector('#alice-container').querySelectorAll('img');
    const imageOne = imageList[0];
    const imageTwo = imageList[1];
    const imageThree = imageList[2];

    // Updates the display element to show which image animate is currently active.
    asyncAwaitAnimationSequenceElements.querySelector('span').innerHTML = `Image One Active`;

    // Triggers the animation for imageOne and the await keyword halts any code execution beyond this line of code until the animation's finished
    // promise is returned.
    await imageOne.animate(aliceTumbling, aliceTiming).finished;

    // Updates the display element to show which image animate is currently active.
    asyncAwaitAnimationSequenceElements.querySelector('span').innerHTML = `Image Two Active`;

    // Triggers the animation for imageTwo and the await keyword halts any code execution beyond this line of code until the animation's finished
    // promise is returned.
    await imageTwo.animate(aliceTumbling, aliceTiming).finished;

    // Updates the display element to show which image animate is currently active.
    asyncAwaitAnimationSequenceElements.querySelector('span').innerHTML = `Image Three Active`;

    // Triggers the animation for imageThree and the await keyword halts any code execution beyond this line of code until the animation's finished
    // promise is returned.
    await imageThree.animate(aliceTumbling, aliceTiming).finished;

    // Updates the display element to show which that all animation are finished.
    asyncAwaitAnimationSequenceElements.querySelector('span').innerHTML = `All Animations Finished Active`;

    // Unsurprisingly, this method was by far the easiest to code and implement, but it does come at the cost of not being able to run other code
    // until the promises are returned. As opposed to continuing to run the function and only triggering the other code once the then handler is triggered
    // on the promise chaining or call back methods.
}

// Used to trigger the Async and Await Animation function.
function asyncAwaitAnimationActivation() {
    // Logs that the animation has started.
    console.log('Async and Await Animation Activated')
    // Calls the function to begin the animation sequence.
    asyncAwaitAnimationSequence()
    // Sets a timeout for 7 seconds.
    setTimeout(() => {
        // Reinitialize the eventListener for the callBackAnimationSequence button.
        asyncAwaitAnimationSequenceElements.querySelector('button').addEventListener('click', callBackAnimationActivation, {once:true});
        // Logs that the animations are finished.
        console.log('Async and Await Animation Button Reloaded');
        // Updates the display to show that the animations are not active.
        asyncAwaitAnimationSequenceElements.querySelector('span').innerHTML = `Not Active`;
    }, 7000); 
}

// Loads all the eventListeners for the webpage.
function loadEventListeners() {
    // Initializes each example's button to trigger their respective animation activations only once.
    callBackAnimationSequenceElements.querySelector('button').addEventListener('click', callBackAnimationActivation, {once:true});
    promiseChainingAnimationSequenceElements.querySelector('button').addEventListener('click', promiseChainingAnimationActivation, {once:true});
    asyncAwaitAnimationSequenceElements.querySelector('button').addEventListener('click', asyncAwaitAnimationActivation, {once:true});
}

loadEventListeners();