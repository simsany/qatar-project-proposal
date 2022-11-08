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

let page: BookingPage;
setDefaultTimeout(TEST_TIMEOUT);

BeforeAll(() => {
  page = new BookingPage();
});

Given("the booking page is open", async () => {
  await page.open();
  await page.acceptCookies();
});

Given("the number of child passengers is set.", async () => {
  await page.openNumberOfPassengersSelector();
  await page.setNumberOfChildrenTo(DEFAULT_CHILDREN_PASSENGER_NUMBER);
});

Then(
  "the child passenger age selection should be available in the set number",
  async () => {
    const childrenAgeSelectorRows = await page.getChildrenAgeSelectorRows();

    return expect(childrenAgeSelectorRows.length).to.equal(
      DEFAULT_CHILDREN_PASSENGER_NUMBER
    );
  }
);

Then(
  "the child passenger age selector value should be {int} by default",
  async (childAge) => {
    const firstChildAge = await page.getNthChildAge(
      DEFAULT_CHILDREN_PASSENGER_NUMBER
    );

    return expect(Number(firstChildAge)).to.equal(childAge);
  }
);

Then(
  "the {word} child passenger age button's availablilty should be {string}",
  async (type, isEnabled) => {
    const changeChildAgeBtn = await page.getChangeChildAgeBtn(type);

    return expect(isEnabled).to.equal(
      (await changeChildAgeBtn.isEnabled()).toString()
    );
  }
);

Then("the counter should display {int}", async (childAge) => {
  const firstChildAge = await page.getNthChildAge(
    DEFAULT_CHILDREN_PASSENGER_NUMBER
  );

  return expect(Number(firstChildAge)).to.equal(childAge);
});

Then("the child age should be {int}", async (childAge) => {
  const firstChildAge = await page.getNthChildAge(
    DEFAULT_CHILDREN_PASSENGER_NUMBER
  );

  return expect(Number(firstChildAge)).to.equal(childAge);
});

When("the user set the child pasenger age to {int}.", async (childAge) => {
  await page.setChildAgeTo(childAge);
});

When("the {word} child age button is clicked", async function (buttonType) {
  const button = await page.getChangeChildAgeBtn(buttonType);
  await button.click();
});

AfterAll(async () => {
  await page.driver.quit();
});
