import { Builder, Capabilities, By } from "selenium-webdriver";

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

test('Search Google Test', async () => {
    await (await driver).get('https://www.google.com/')

    let searchBar = By.css('input[title="Search"]')
    let results = By.id('res')

    await (await driver).findElement(searchBar).sendKeys('Flower Fields\n')
    })