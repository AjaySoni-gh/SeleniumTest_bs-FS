const {Builder,By, Key}= require("selenium-webdriver");
const MicrosoftEdge=require("selenium-webdriver/edge");
const options= new MicrosoftEdge.Options();





async function example(){
    let driver = await new Builder().forBrowser("MicrosoftEdge").build();   // launch the browser

    await driver.get("http://localhost:5173/books/create") // navigaes to the app

await driver.findElement(By.id("titleInputField")).sendKeys("Naruto");
await driver.findElement(By.id("authorInputField")).sendKeys("kishimoto")
await driver.findElement(By.id("publishYearInputField")).sendKeys("1999")   // add details 
await driver.findElement(By.id("saveButton")).click();    // clicks the save button
   // driver.quit();

}
example()