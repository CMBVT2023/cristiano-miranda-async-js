const greetingExampleElements = document.getElementById('greeting-example');
const generatePrimesExampleElements = document.getElementById('generate-primes-example');
const httpRequestExampleElements = document.getElementById('http-request-example');
const callBackExampleElements = document.getElementById('callback-example');

function greetingExample(name) {
    greetingExampleElements.querySelector('h4').innerHTML = `
        Hello ${name}, nice to meet you!`;
    console.log('Hello, my name is Cristiano!');
}

function generatePrimesExample(num) {
    const maximum = num;

    function isPrime(n) {
        for (let i =2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false
            }
        }

        return n > 1;
    }

    const random = (max) => Math.floor(Math.random() * max);

    const primes = [];
    while (primes.length < num) {
        const candidate = random(maximum);
        if (isPrime(candidate)) {
            primes.push(candidate);
        }
    }

    return primes;
}

function httpRequestExample() {
    const xhr = new XMLHttpRequest(); 

    xhr.addEventListener('loadend', () => {
        httpRequestExampleElements.querySelector('h5').innerHTML = `Finished with status: ${xhr.status}`;
    })

    xhr.open('GET',
        "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
    )
    xhr.send()
    httpRequestExampleElements.querySelector('span').innerHTML = `Finished`;
}

function callBackExample(type) {
    if (type === 0) {
        function doStep1(val) {
            return val + 1;
        }
        function doStep2(val) {
            return val + 2;
        }
        function doStep3(val) {
            return val + 3;
        }

        let result = 0;
        result = doStep1(result);
        result = doStep2(result);
        result = doStep3(result);
        callBackExampleElements.querySelectorAll('span')[0].innerHTML = result;
    } else if (type === 1) {
        function doStep1(val, callback) {
            const result = val + 1;
            callback(result);
        }
        function doStep2(val, callback) {
            const result = val + 2;
            callback(result);
        }
        function doStep3(val, callback) {
            const result = val + 3;
            callback(result);
        }

        doStep1(0, (result1) => {
            console.log('nest 1')
            doStep2(result1, (result2) => {
                console.log('nest 2')
                doStep3(result2, (result3) => {
                    console.log('nest 3')
                    callBackExampleElements.querySelectorAll('span')[1].innerHTML = result3;
                })
            })
        })
    }
}

function loadEventListeners() {
    greetingExampleElements.querySelector('input').addEventListener('change', (e) => {
        greetingExample(e.target.value);
    })

    generatePrimesExampleElements.querySelector('input').addEventListener('change', () => {
        generatePrimesExampleElements.querySelector('span').innerHTML = 'Not Started'
    })
    generatePrimesExampleElements.querySelector('button').addEventListener('click', () => {
        let result = generatePrimesExample(generatePrimesExampleElements.querySelector('input').value)
        generatePrimesExampleElements.querySelector('span').innerHTML = 'Finished';
    })

    let httpRequestButtons = httpRequestExampleElements.querySelectorAll('button');
    httpRequestButtons[0].addEventListener('click', () => {
        httpRequestExample();
    })
    httpRequestButtons[1].addEventListener('click', () => {
        httpRequestExampleElements.querySelector('span').innerHTML = `Not Started`;
        httpRequestExampleElements.querySelector('h5').innerHTML = ``;
    })

    let callBackButtons = callBackExampleElements.querySelectorAll('button')
    callBackButtons[2].addEventListener('click', () => {
        callBackExampleElements.querySelectorAll('span').forEach((e) => e.innerHTML = ``);
    })
    callBackButtons[0].addEventListener('click', () => {
        callBackExample(0);
    })
    callBackButtons[1].addEventListener('click', () => {
        callBackExample(1);
    })
}

loadEventListeners()