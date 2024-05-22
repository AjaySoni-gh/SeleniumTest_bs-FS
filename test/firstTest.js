

const { Builder, By, until, key } = require("selenium-webdriver");
const MicrosoftEdge = require("selenium-webdriver/edge");

const assert = require("assert");
// const { link } = require("fs");


// // describe
describe("checks the link and adds a book", function () {


    //it 
    it("successfully checks add book button link", async function checkWebLink() {

        const url = "http://localhost:5173";
        let driver;

        try {

            driver = await new Builder().forBrowser("MicrosoftEdge").build();   // launch the browser

            // Navigate URL
            await driver.get(url);

            // Wait for the page to load completely (optional)
            await driver.findElement(By.id("createButton")).click();
            await driver.wait(until.titleIs("http://localhost:5173/books/create"), 5000);

            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).to.equal(url);

            console.log("Web link is valid and leads to the expected URL.");
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            // Quit 
            await driver.quit();
        }
    })
    //it 
    it("successfully added a book", async function () {
        let driver = await new Builder().forBrowser("MicrosoftEdge").build();   // launch the browser

        await driver.get("http://localhost:5173") // navigaes to the app
        await driver.findElement(By.id("createButton")).click(); //presses create book button

        await driver.findElement(By.id("titleInputField")).sendKeys("Naruto");
        await driver.findElement(By.id("authorInputField")).sendKeys("kishimoto")
        await driver.findElement(By.id("publishYearInputField")).sendKeys("1999")   // add details 
        await driver.findElement(By.id("saveButton")).click();    // clicks the save button

        driver.quit();
    })


});

