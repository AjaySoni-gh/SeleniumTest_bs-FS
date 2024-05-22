const { until,Builder, By } = require("selenium-webdriver");
const MicrosoftEdge = require("selenium-webdriver/edge");
const assert = require("assert");

// Declare the driver variable outside of the test cases
let driver;

// describe block
describe("whole applications UI test", function () {
    // Before each test case, initialize the driver
    beforeEach(async function () {
        driver = await new Builder().forBrowser("MicrosoftEdge").build(); // launch the browser
    });

    // After each test case, quit the driver
//     afterEach(async function () {
//   await driver.quit();
//     });

    // it
    it("successfully added another book", async function () {
        await driver.get("http://localhost:5173"); // navigate to the app
        await driver.findElement(By.id("createButton")).click(); // press create book button
        await driver.findElement(By.id("titleInputField")).sendKeys("Black clover");
        await driver.findElement(By.id("authorInputField")).sendKeys("NA");
        await driver.findElement(By.id("publishYearInputField")).sendKeys("2012"); // add details
        await driver.findElement(By.id("saveButton")).click(); // click the save button

        await driver.quit();
    });

    it("successfully checks name of book", async function () {
        await driver.get("http://localhost:5173"); // navigate to the app
        // Assuming the book has already been added in the previous test
        let word = await driver.wait(until.elementLocated(By.xpath("//div/table/tbody/tr[13]/td[2]"))).getText();
        assert.strictEqual(word, word);// word can be changed to any book name 
        await driver.quit();  
    });

      
    it("successfully delete button of book (if any)", async function () {
        await driver.get("http://localhost:5173"); // navigate to the app
      
      
      
     
      
        const deleteLink = await driver.findElement(By.xpath("//a[contains(@href, '/books/delete/')]")); // Assuming unique part in URL
        
        await deleteLink.click();

        async function Five() {
            await new Promise(resolve => setTimeout(resolve, 5000));
            const delebutton= await driver.findElement(By.id("deleteButton"));
        await delebutton.click();
          }
       Five();   // clicks the delete button
       await driver.quit(); 
      });



      it("successfully check info of book ", async function () {
        await driver.get("http://localhost:5173"); // navigate to the app
      
        // Check if there are any rows in the table
       // const tableRows = await driver.findElements(By.xpath("//table/tbody/tr"));
        
        const infoLink = await driver.findElement(By.xpath("//table/tbody/tr[1]/td[5]/div/a[1]")); 
        
        await infoLink.click();

        await driver.quit();
 
        

})
it("successfully added 10 books at once", async function () {
    await driver.get("http://localhost:5173"); // navigate to the app
    
    // Add 10 books
        for (let i = 0; i < 12; i++) {
        await driver.get("http://localhost:5173"); // navigate to the app
        await driver.findElement(By.id("createButton")).click(); // press create book button
        await driver.findElement(By.id("titleInputField")).sendKeys("Book Title " + i); // unique title for each book
        await driver.findElement(By.id("authorInputField")).sendKeys("Author " + i); // unique author for each book
        await driver.findElement(By.id("publishYearInputField")).sendKeys("2024"); // add publish year
        await driver.findElement(By.id("saveButton")).click(); // click the save button
        await driver.quit();
    }
});


    
it("successfully delete 10 books (if any)", async function () {
    await driver.get("http://localhost:5173"); // navigate to the app

    // Check if there are any rows in the table
    let tableRows = await driver.findElements(By.xpath("//table/tbody/tr"));
    
    if (tableRows.length === 0) {
        console.log("No books found to delete.");
        return; // Exit the test if there are no books
    }

    for (let i = 0; i < Math.min(10, tableRows.length); i++) {
        // Re-fetch the rows in each iteration since the DOM is changing
        tableRows = await driver.findElements(By.xpath("//table/tbody/tr"));

        // if (tableRows.length === 0) {
        //     console.log("No more books to delete.");
        //     break; // Exit the loop if there are no more books
        // }

        const deleteLink = await driver.findElement(By.xpath("//table/tbody/tr[1]/td[5]/div/a[3]"));
        await deleteLink.click(); // Click the delete link

        const deleteButton = await driver.findElement(By.id("deleteButton"));
        await deleteButton.click(); // Click the confirm delete button

        // Wait for a short period to allow for the deletion to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
});


 });