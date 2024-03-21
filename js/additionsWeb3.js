// Function used to generate a random voucher (normally it should be retrieved with an API from YouTube)
function generateVoucher() {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) {
            code += '-';
        }
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Const used to format in a good way the date to be displayed
const formatDate = (timestamp) => {
    const timestampNumber = Number(timestamp);
    const date = new Date(timestampNumber * 1000);
    const day = date.getDate();
    const month = date.toLocaleString('default', {
        month: 'short'
    });
    const year = date.getFullYear();
    return `${day}, ${month} ${year}`;
};

// Function used to retrieve date from the formatDate (above)
function parseCustomDateFormat(dateString) {
    // Split the string into components
    const parts = dateString.split(', ');
    const day = parseInt(parts[0], 10);
    const month = parts[1].split(" ")[0];
    const year = parseInt(parts[1].split(" ")[1], 10);
    // Convert month name to month number (0-based index: jan = 0, dec = 11)
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const monthNumber = months.indexOf(month);
    // Create a new Date object
    return new Date(year, monthNumber, day);
}

// Function to calculate the difference between two dates in formatDate format
function calculateDaysDifference(date1, date2) {
    const date1Parsed = parseCustomDateFormat(date1);
    const date2Parsed = parseCustomDateFormat(date2);
    const differenceInMilliseconds = date2Parsed - date1Parsed;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.abs(Math.round(differenceInDays));
}

// Function used to transform an ASCII string into Integer to pass as input at the addVideo function of the smart contract
function asciiToDecimal(asciiString) {
    let decimalString = '';
    for (let i = 0; i < asciiString.length; i++) {
        let decimalValue = asciiString.charCodeAt(i).toString();
        // Add a leading 0 if the decimalValue length is 2, except for the first character
        if (decimalValue.length === 2 && i !== 0) {
            decimalValue = '0' + decimalValue;
        }
        decimalString += decimalValue;
    }
    return decimalString;
}

// Function to convert decimal videoID to string type
function decimalToString(decimal) {
    let decimalStr = decimal.toString();
    let asciiString = '';
    let firstCharLength = decimalStr.length % 3 === 0 ? 3 : 2;
    asciiString += String.fromCharCode(parseInt(decimalStr.substr(0, firstCharLength), 10));
    for (let i = firstCharLength; i < decimalStr.length; i += 3) {
        let charCodeStr = decimalStr.substr(i, 3);
        asciiString += String.fromCharCode(parseInt(charCodeStr, 10));
    }
    return asciiString;
}


// API call to retrieve the YouTube video title
async function fetchYouTubeVideoTitle(videoId) {
    const apiKey = 'AIzaSyCac5ikDuUb0bSNO1KtbiEdNp7fycWtn78';
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items.length > 0) {
            return data.items[0].snippet.title;
        } else {
            return 'Title not found';
        }
    } catch (error) {
        console.error('Error fetching video title:', error);
        return 'Error fetching title';
    }
}

// API call to retrieve the length of a YouTube video
async function fetchYouTubeVideoLength(videoId) {
    const apiKey = 'AIzaSyCac5ikDuUb0bSNO1KtbiEdNp7fycWtn78';
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=contentDetails`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items.length > 0) {
            const duration = data.items[0].contentDetails.duration;
            const seconds = convertISO8601ToSeconds(duration);
            return seconds;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching video length:', error);
    }
}

// Function to convert ISO8601 length of video to seconds
function convertISO8601ToSeconds(input) {
    let totalSeconds = 0;
    let hours = input.match(/(\d+)H/);
    let minutes = input.match(/(\d+)M/);
    let seconds = input.match(/(\d+)S/);
    if (hours) totalSeconds += parseInt(hours[1]) * 3600;
    if (minutes) totalSeconds += parseInt(minutes[1]) * 60;
    if (seconds) totalSeconds += parseInt(seconds[1]);
    return totalSeconds;
}

// Function to retrieve the value from a dictionary
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// Function to calculate the kecca256 to pass as input to submitHash
function hashTagListAndSeed(tagList, seed) {
    // Ensure the seed length is 11
    if (seed.length !== 11) {
        throw new Error('Seed must have a length of 11 characters');
    }
    // Convert the array of integers to a string, with elements separated by spaces
    const tagListString = tagList.join(' ');
    // Concatenate the tagList string and the seed, separated by a space
    const inputString = `${tagListString} ${seed}`;
    // Compute and return the Keccak-256 hash
    return "0x" + keccak256(inputString);
}

// Retrieve number of validators that submitted their hashes
function getHashedCounter(address, videoId) {
    const hashedCounter = dAppContract.methods.videos(address, asciiToDecimal(videoId)).call().then((video) => video.hashedCounter);
    return hashedCounter;
}

// Retrieve number of validators that revealed their hashes
function getRevealedCounter(address, videoId) {
    const revealedCounter = dAppContract.methods.videos(address, asciiToDecimal(videoId)).call().then((video) => video.revCounter);
    return revealedCounter;
}

// Convert string into Bytes11
function stringToBytes11(str) {
    // Convert the string to a hex string
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16);
    }
    // Ensure the hex string is no longer than 22 characters (11 bytes)
    hex = hex.slice(0, 22);
    // Pad the hex string to ensure it represents exactly 11 bytes
    while (hex.length < 22) {
        hex += '0'; // Pad with trailing zeros (adjust if different padding is required)
    }
    return '0x' + hex; // Prefix with '0x' to denote a hex string
}

// Funtion used to calcalte the percentages of tags voted
function calculateTagPercentages(votes, totalValidators) {
    // Object to keep track of tag counts
    const tagCounts = {};
    // Count the occurrences of each tag in the votes list
    votes.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    // Map the tagCounts object to an array of [tag, percentage] pairs
    const result = Object.entries(tagCounts).map(([tag, count]) => {
        const percentage = (count / totalValidators) * 100;
        return [tag, percentage.toString()];
    });
    return result;
}

// Function to update in real time the vote page
function updateVotePage() {
    loadVoteList(1);
    var all = document.querySelector(".filter_all"); 
    var pending = document.querySelector(".filter_pending"); 
    var action = document.querySelector(".filter_action"); 
    var completed = document.querySelector(".filter_completed");
    all.classList.remove("filter_element_active");
    pending.classList.remove("filter_element_active");
    action.classList.remove("filter_element_active");
    completed.classList.remove("filter_element_active");
    all.classList.add("filter_element_active");
}