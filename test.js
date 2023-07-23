const fs = require('fs');

function isJsonFileEmpty(filePath) {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    var parsedData = {}
    try {
        parsedData = JSON.parse(jsonData);
    } catch(error) {
        console.log("Unable to parse.")
    }
    
    return Object.keys(parsedData).length === 0;
  } catch (error) {
    
    console.error('Error reading or parsing JSON file:', error);
    return true;
  }
}

// Example usage
const filePath = 'winning_word.json';
const isEmpty = isJsonFileEmpty(filePath);
console.log(`Is JSON file empty? ${isEmpty}`);