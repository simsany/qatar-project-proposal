import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { BookingPage } from "../pages/bookingPage";
import { Builder, } from "selenium-webdriver";
import { expect } from "chai";
import{TEST_TIMEOUT} from '../data/constants'
import {config} from "dotenv"

config()
setDefaultTimeout(TEST_TIMEOUT);

const driver = new Builder().forBrowser(process.env.BROWSER_TYPE).build();
const page = new BookingPage(
  driver,
 process.env.BOOKING_PAGE_URL
);

Given("the booking page is open", async function () {
  await page.open();
  await page.acceptCookies();
});

Given("the number of child passengers is set.", async function () {
  await page.open();
  await page.acceptCookies();
  await page.openNumberOfPassengersSelector()
  await page.setNumberOfChildrenTo(1);
});

Then(
  "the child passenger age selection should be available in the set number",
  async function () {
    const childrenAgeSelectorRows = await page.getChildrenAgeSelectorRows()
    return expect(childrenAgeSelectorRows.length).to.equal(1);
  }
);

Then(
  "the child passenger age selector value should be {int} by default",
  async function (int) {
    const firstChildAgeContainer= await page.getNthChildAge(1)
    const displayedNumber =await firstChildAgeContainer.getText();
    return expect(Number(displayedNumber)).to.equal(int);
  }
);

Then(
  "the increase child passenger age button's availablilty should be {string}",
  async function (string) {
    const increaseChildAgeBtn= await page.getIncreaseChildAgeBtn()
    return expect(string).to.equal((await increaseChildAgeBtn.isEnabled()).toString());
  }
);

Then(
  "the decrease child passenger age button's availablilty should be {string}",
  async function (string) {
    const decreaseChildAgeBtn= await page.getDecreaseChildAgeBtn()
    return expect(string).to.equal((await decreaseChildAgeBtn.isEnabled()).toString());
  }
);

When("the user set the child pasenger age to {int}.", async function (int) {
await page.setChildAgeTo(int)
});

Then("the counter should display {int}", async function (int) {
  const firstChildAgeContainer= await page.getNthChildAge(1)
  const displayedNumber =await firstChildAgeContainer.getText();
  return expect(Number(displayedNumber)).to.equal(int);
});
