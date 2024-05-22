const { Builder, until, By } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");

let driver;

describe("when internet has high latency", function () {
  this.timeout(30000); // Increase the timeout to handle high latency

  this.beforeEach(async function () {
    const options = new edge.Options();
    driver = await new Builder().forBrowser("MicrosoftEdge").setEdgeOptions(options).build();
    await driver.get("http://localhost:5173");
  });

 
  it("displays spinning wheel when clicking the info button", async function () {
    // imported expect 
    (async () => {
      const { expect } = await import('chai');

      // network conditions
      await driver.setNetworkConditions({
        offline: false,
        latency: 1000, // 1000 ms latency
        downloadThroughput: 35 * 1024, // 35 KB/s download s
        uploadThroughput: 50 * 1024 // 50 KB/s upload s
      });

      try {
        const infoLink = await driver.wait(until.elementLocated(By.xpath("//table/tbody/tr[1]/td[5]/div/a")), 10000);
        await infoLink.click();

        console.log("Clicked info link");

        const spinner = await driver.wait(until.elementLocated(By.id("showBookSpinner")), 10000);
        console.log("Spinner located");

        const isSpinnerDisplayed = await spinner.isDisplayed();
        expect(isSpinnerDisplayed).to.be.true;

        console.log("Spinner is displayed");

        
        await driver.wait(until.elementIsNotVisible(spinner), 20000);

        console.log("Spinner disappeared");      // debugging skills :o
      } catch (error) {
        console.error("Error occurred:", error);
      } finally {
        // Reset network conditions
        await driver.setNetworkConditions({
          offline: false,
          latency: 0,
          downloadThroughput: -1,
          uploadThroughput: -1
        });
      }
    })();
    await driver.quit(); 
 });
});
