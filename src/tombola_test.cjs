const { Builder, By, until } = require("selenium-webdriver");

const repeatCount = 1000; // Change this number to the desired repetition count

async function performActionInBrowser() {
  let driver;

  try {
    // Launch a browser instance (in this case, Firefox)
    driver = await new Builder().forBrowser("firefox").build();

    // Navigate to the actual web page URL
    await driver.get('http://intersportgames.dk/tombola');

    // Wait for the page to be fully loaded
    await driver.wait(until.elementLocated(By.className("testButton")));

    for (let i = 1; i < repeatCount; i++) {
      // Find the button by its class name ("testButton")
      const testButton = await driver.findElement(By.className("testButton"));

      // Use JavaScript to trigger a click event on the button
      await driver.executeScript("arguments[0].click();", testButton);


      // Log "Clicked Balloon" when the button is clicked
      console.log("Clicked Balloon");
    }
  } catch (error) {
    console.error("Error in browser instance:", error);
  } finally {
    if (driver) {
      try {
        // Close the browser
        await driver.quit();
      } catch (quitError) {
        console.error("Error while quitting the browser:", quitError);
      }
    }
  }
}

// Run the script
performActionInBrowser();
