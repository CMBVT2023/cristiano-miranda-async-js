addEventListener('message', (message) => {
    if (message.data.command === "spinal-tap") {
        let str = spinalTapConversion(message.data.name);
        postMessage({return: "spinal-tap", str});
    } else if (message.data.command === "capitalize") {
        let str = capitalizeName(message.data.name);
        postMessage({return: "capitalize", str});
    } else if (message.data.command === "lower-case") {
        let str = lowerCaseEntireString(message.data.name);
        postMessage({return: "lower-case", str})
    }
})

function capitalizeName(str) {
    // Splits the string into separate words.
    let arr = str.split(' ');

    // Iterates through all of the words in the array.
    for (const index in arr) {
        // Replaces the word in the array with its capitalized counterpart.
        arr[index] = arr[index][0].toUpperCase() + arr[index].substring(1);
    }

    // Returns a string composed of all words in the array joined by a space.
    return arr.join(' ');
}

function spinalTapConversion(str) {
    // Uses .replace() to replace any instance where a lowercase character is followed by a uppercase, and it simply inserts a space between the two.
    str = str.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Initializes the regexPattern variable that looks for all spaces or "_".
    let regexPattern = /[ _]/g;

    // Uses .split() method with the regexPattern to split the string at all spaces or "_" and then joins the words with a "-" and then converts any uppercase character to lowercase.
    return str.split(regexPattern).join('-').toLowerCase()
}

function lowerCaseEntireString(str) {
    return str.toLowerCase();
}