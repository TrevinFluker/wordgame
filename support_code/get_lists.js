const puppeteer = require('puppeteer');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const run = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--window-size=1100,850`],
        timeout: 0
    });
    const page = await browser.newPage();

    const words = fs.readFileSync('gptlist.txt', 'utf-8').split('\n');

    // Connect to MongoDB
    const client = new MongoClient('mongodb+srv://trevin:7CKbqHbcMkW6kpR6@cluster1.slxxa.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('wordgame');
    const collection = db.collection('word_rankings');

    for (const word of words) {
        await page.goto('https://semantle.com/make');
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));

        const cleanWord = word.replace('\r', '');
        await page.type('#word', cleanWord);
        await page.keyboard.press('Enter');

        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));

        const data = await page.evaluate(() => {
            const elements = document.getElementById('nearest').querySelectorAll('td:nth-child(2)');
            return Array.from(elements, element => element.textContent.trim());
        });

        // If no elements are found, log "Word unknown" and continue to next word
        if (data.length === 0) {
            console.log("Word unknown");
            continue;
        }

        let result = {
            [cleanWord]: 1, // word from the `words` list is the first property with a value of 1
        };

        // Add the words from `data` to `result` as properties, with their value starting from 2
        for(let i = 0; i < Math.min(data.length, 999); i++) {
            result[data[i]] = i + 2;
        }

        console.log(result); // logs each result individually

        // Insert the result into MongoDB
        await collection.insertOne(result);
    }

    await browser.close();
    await client.close(); // Remember to close the MongoDB connection when you're done
};

run();

