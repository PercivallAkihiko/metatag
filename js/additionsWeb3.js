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
    const month = date.toLocaleString('default', { month: 'short' }); 
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