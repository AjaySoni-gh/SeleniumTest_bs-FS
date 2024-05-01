const {Builder}= require("selenium-webdriver");


const driver = new Builder().forBrowser("MicrosoftEdge").build();

driver.get("http://facebook.com");

// async function example(){


// }