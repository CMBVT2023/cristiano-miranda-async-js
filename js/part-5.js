const callBackAnimationSequenceElements = document.getElementById('callBack-animation-practice');
const promiseChainingAnimationSequenceElements = document.getElementById('promise-chaining-animation-practice');

const aliceTumbling = [
    { transform: "rotate(0) scale(1)" },
    { transform: "rotate(360deg) scale(0)" }
];

const aliceTiming = {
    duration: 2000,
    iterations: 1,
    fills: "forwards",
};

function callBackAnimationSequence() {
    let imageList = callBackAnimationSequenceElements.querySelector('#alice-container').querySelectorAll('img');
    const imageOne = imageList[0];
    const imageTwo = imageList[1];
    const imageThree = imageList[2];

    let animationOne = imageOne.animate(aliceTumbling, aliceTiming);
    callBackAnimationSequenceElements.querySelector('span').innerHTML = `Image One Active`;
    
    animationOne.finished.then(() => {
        let animationTwo = imageTwo.animate(aliceTumbling, aliceTiming);
        callBackAnimationSequenceElements.querySelector('span').innerHTML = `Image Two Active`;
        animationTwo.finished.then(() => {
            let animationThree = imageThree.animate(aliceTumbling, aliceTiming);
            callBackAnimationSequenceElements.querySelector('span').innerHTML = `Image Three Active`;
            animationThree.finished.then(() => {
                callBackAnimationSequenceElements.querySelector('span').innerHTML = `All Animations Finished`;
            }).catch((error) => {
                console.error(`Error: ${error}`);
            })
            }).catch((error) => {
            console.error(`Error: ${error}`);
            })
    }).catch((error) => {
        console.error(`Error: ${error}`);
    })
}

function callBackAnimationActivation() {
    console.log('Callback Animation Activated')
    callBackAnimationSequence()
    setTimeout(() => {
        callBackAnimationSequenceElements.querySelector('button').addEventListener('click', callBackAnimationActivation, {once:true});
        console.log('Callback Animation Button Reloaded');
        callBackAnimationSequenceElements.querySelector('span').innerHTML = `Not Active`;
    }, 7000); 
}

function promiseChainingAnimationSequence() {
    let imageList = promiseChainingAnimationSequenceElements.querySelector('#alice-container').querySelectorAll('img');
    const imageOne = imageList[0];
    const imageTwo = imageList[1];
    const imageThree = imageList[2];

    promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `Image One Active`;

    // This is the most concise way of animating the sequence, instead of chaining the .then() handler within the previous one, it takes the result of the arrow function
    // and applies the then on the returned object. The only issue is that no other code can be executed within the .then() handler otherwise it would not properly next .then() handler to the 
    // finished animation object. I had to instead create a new interval timeout to update the animation display. While this method is easier to code and understand, it has limitations in what
    // can be done within the chaining. 
    
    // Attempt to use the return keyword to see if this can be fixed. This actually solve the issue so this method is better, so long as the finished image is returned this .then() chaining method
    // can be used even if other code is implemented within the arrow functions
    imageOne.animate(aliceTumbling, aliceTiming).finished
    .then(() => {
        promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `Image Two Active`;
        return imageTwo.animate(aliceTumbling, aliceTiming).finished})
    .then(() => {
        promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `Image Three Active`;
        return imageThree.animate(aliceTumbling, aliceTiming).finished})
    .then(() => {promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `All Animations Finished`})
    .catch(error => console.error(`Error: ${error}`));

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

function promiseChainingAnimationActivation() {
    console.log('Promise Chaining Animation Activated')
    promiseChainingAnimationSequence()
    setTimeout(() => {
        promiseChainingAnimationSequenceElements.querySelector('button').addEventListener('click', callBackAnimationActivation, {once:true});
        console.log('Promise Chaining  Animation Button Reloaded');
        promiseChainingAnimationSequenceElements.querySelector('span').innerHTML = `Not Active`;
    }, 7000); 
}

function loadEventListeners() {
    callBackAnimationSequenceElements.querySelector('button').addEventListener('click', callBackAnimationActivation, {once:true});
    promiseChainingAnimationSequenceElements.querySelector('button').addEventListener('click', promiseChainingAnimationActivation, {once:true});
}

loadEventListeners();