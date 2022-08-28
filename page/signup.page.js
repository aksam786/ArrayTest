const { expect } = require('@playwright/test');
const locators = require('../page/signup.locators.json');
const testData = require('../data/testData.json')

class SignUp {

    constructor(page) {
        this.page = page;
    }

    async fillFirstName(firstName) {
        try {
            await this.page.locator(locators.FirstName).fill(firstName)
        } catch (error) {
            throw new Error("Error in filling first Name" + error)
        }
    }

    async fillLastName(lastName) {
        try {
            await this.page.fill(locators.LastName, lastName)
        } catch (error) {
            throw new Error("Error in filling last Name" + error)
        }
    }

    async fillStreetAddress(streetAddress) {
        try {
            await this.page.fill(locators.Street, streetAddress)
        } catch (error) {
            throw new Error("Error in filling Street Address" + error)
        }
    }

    async fillCity(city) {
        try {
            await this.page.fill(locators.City, city)
        } catch (error) {
            throw new Error("Error in filling City" + error)
        }
    }

    async selectState(state) {
        try {
            await this.page.locator(locators.StateDropdown).selectOption({ label: `${state}` })
        } catch (error) {
            throw new Error("Error in selecting state\n" + error)
        }
    }

    async fillZip(zip) {
        try {
            await this.page.fill(locators.Zip, zip)
        } catch (error) {
            throw new Error("Error in filling zip code\n" + error)
        }
    }

    async clickNextorSubmitButton() {
        try {
            await this.page.click(locators.NextButton)
        } catch (error) {
            throw new Error("Error in clicking next button\n" + error)
        }
    }

    async selectDOB(mm, dd, yyyy) {
        try {
            await this.page.locator(locators.DOBDropdown).first().selectOption({ label: `${mm}` })
            await this.page.locator(locators.DOBDropdown).nth(1).selectOption({ label: `${dd}` })
            await this.page.locator(locators.DOBDropdown).last().selectOption({ label: `${yyyy}` })
        } catch (error) {
            throw new Error("Error in selecting state\n" + error)
        }
    }

    async fillSSN(ssn) {
        try {
            await this.page.locator(locators.SSN).fill(ssn)
        } catch (error) {
            throw new Error("Error in filling ssn\n" + error)
        }
    }

    
    async secuityVerification() {
        try {
            await this.page.waitForTimeout(10000)
            for (let j = 0; j < 10; i++) { 

                // validate if user has completed the sign up and is on Sign Up Completion Page
                await this.page.waitForTimeout(3000)
                const SignUpCompletionVisible = await this.page.locator(locators.SignUpCompletion).isVisible();
                console.log("SignUpCompletionVisible", SignUpCompletionVisible)
                if (SignUpCompletionVisible == true) {
                    await this.page.click(locators.NextButton)
                    await this.page.waitForTimeout(20000)
                    console.log("DashboardPageValidation", await this.page.locator(locators.DashboardValidation).isVisible())
                    await expect(await this.page.locator(locators.DashboardValidation)).toBeVisible();
                    await this.page.waitForTimeout(5000)
                    break;
                }
                else {

                    // Get the questions appearing on a page and store them in an array
                    const noOFQuestions = await this.page.locator(locators.SecuirtyQuestions).count();
                    var QuestionsArray = [];
                    for (var i = 1; i < noOFQuestions;) {
                        const questionName = await this.page.innerText(`span >> nth = ${i}`)
                        console.log(questionName)
                        QuestionsArray.push(questionName)
                        i = i + 2;
                    }

                    const sizeOfQuestionsArray = QuestionsArray.length;
                    for (let i = 0; i < sizeOfQuestionsArray; i++) {
                        if (QuestionsArray[i] == testData.PreviousEmployeerQues) {
                            await this.page.locator(locators.Employeer).click()
                        }
                        else if (QuestionsArray[i] == testData.SSNStateSecurityQues) {
                            await this.page.locator(locators.StateOfSSN).click()
                        }
                        else {
                            await this.page.locator(locators.NoneOption).nth(i).click();
                        }
                    }
                    await this.page.waitForTimeout(4000)
                    await this.page.click(locators.NextButton)
                    await this.page.waitForTimeout(5000)
                    continue;
                }
            }
        } catch (error) {
            throw new Error("Error in completing security verification\n" + error)
        }


    }

    async validateCreditScorePage() {
        try {
            await expect(await this.page.locator(locators.CreditScore)).toBeVisible();
        } catch (error) {
            throw new Error("Error in validating credit score page\n" + error)
        }
    }

    async logout() {
        try {
            await this.page.locator(locators.SettingsButton).click();
            await this.page.locator(locators.LogoutButton).click()
            await expect(await this.page.locator(locators.LoginPage)).toBeVisible();
        } catch (error) {
            throw new Error("Error in validating credit score page" + error)
        }
    }
}

module.exports = { SignUp }