import {
  Given,
  When,
  Then,
  setDefaultTimeout,
  AfterAll,
  BeforeAll,
} from "@cucumber/cucumber";
import { BookingPage } from "../pages/bookingPage";
import { expect } from "chai";
import {
  TEST_TIMEOUT,
  DEFAULT_CHILDREN_PASSENGER_NUMBER,
} from "../data/constants";
import { config } from "dotenv";

let page: BookingPage;
config();
setDefaultTimeout(TEST_TIMEOUT);

BeforeAll(function () {
  page = new BookingPage();
});

Given("the booking page is open", async function () {
  await page.open();
  await page.acceptCookies();
});

Given("the number of child passengers is set.", async function () {
  await page.openNumberOfPassengersSelector();
  await page.setNumberOfChildrenTo(DEFAULT_CHILDREN_PASSENGER_NUMBER);
});

Then(
  "the child passenger age selection should be available in the set number",
  async function () {
    const childrenAgeSelectorRows = await page.getChildrenAgeSelectorRows();

    return expect(childrenAgeSelectorRows.length).to.equal(
      DEFAULT_CHILDREN_PASSENGER_NUMBER
    );
  }
);

Then(
  "the child passenger age selector value should be {int} by default",
  async function (childAge) {
    const firstChildAge = await page.getNthChildAge(
      DEFAULT_CHILDREN_PASSENGER_NUMBER
    );

    return expect(Number(firstChildAge)).to.equal(childAge);
  }
);

Then(
  "the {word} child passenger age button's availablilty should be {string}",
  async function (type, isEnabled) {
    const changeChildAgeBtn = await page.getChangeChildAgeBtn(type);

    return expect(isEnabled).to.equal(
      (await changeChildAgeBtn.isEnabled()).toString()
    );
  }
);

When("the user set the child pasenger age to {int}.", async function (childAge) {
  await page.setChildAgeTo(childAge);
});

Then("the counter should display {int}", async function (childAge) {
  const firstChildAge = await page.getNthChildAge(
    DEFAULT_CHILDREN_PASSENGER_NUMBER
  );

  return expect(Number(firstChildAge)).to.equal(childAge);
});

AfterAll(async function () {
  await page.driver.quit();
});
