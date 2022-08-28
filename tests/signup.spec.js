const { default: test } = require("@playwright/test")
const { SignUp } = require("../page/signup.page")
const testData = require('../data/testData.json')


test.describe("Scenario - Sign Up", async () => {


  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto('https://whitelabel.sandbox.array.io/signup?platform=v3'); // open the url
  })

  test("Sign Up - SMOKE", async ({ page }) => {
    const signUpObj = new SignUp(page);
    await signUpObj.fillFirstName(testData.firstName);
    await signUpObj.fillLastName(testData.lastName);
    await signUpObj.fillStreetAddress(testData.street);
    await signUpObj.fillCity(testData.city);
    await signUpObj.selectState(testData.state);
    await signUpObj.fillZip(testData.zip);
    await signUpObj.clickNextorSubmitButton();
    await signUpObj.selectDOB(testData.Month, testData.Day, testData.Year);
    await signUpObj.fillSSN(testData.Ssn);
    await signUpObj.clickNextorSubmitButton();
    await signUpObj.secuityVerification();
    await signUpObj.validateCreditScorePage(); // validte credit score page
    await signUpObj.logout(); // logout from application and validation
  })


})