import { By } from "selenium-webdriver";
import selectors from "../pages/selectors.json";

export class BookingPage {
  url: string;
  driver: any;
  constructor(driver, url) {
    this.url = url;
    this.driver = driver;
  }

  getChildrenAgeSelectorRows = async () => {
    const rows = await this.driver.findElements(
      By.css(".children-age-selector-row")
    );
    return rows;
  };

  getNthChildAge = async (n: number) => {
    const childAgeContainers = await this.driver.findElements(
      By.css(selectors.childAgeContainer)
    );
    return childAgeContainers[n - 1];
  };

  open = async () => {
    await this.driver.get(this.url);
  };

  click = async (selector: string) => {
    const elements = await this.driver.findElements(By.css(selector));
    if (elements.length) {
      await elements[0].click();
    }
  };

  acceptCookies = async () => {
    await this.click(selectors.acceptCookiesBtn);
  };

  openNumberOfPassengersSelector = async () => {
    await this.click(selectors.passengersSelectorDropdown);
  };

  setChildAgeTo = async (age: number) => {
    for (let i = 0; i < age - 2; i++) {
      let a = await this.driver.findElement(
        By.css(".btn-increase.increase-child-age")
      );
      await a.click();
    }
  };

  getIncreaseChildAgeBtn= async()=>{
    return this.driver.findElement(
      By.css(selectors.increaseChildAgeBtn)
    );
  }

  getDecreaseChildAgeBtn= async()=>{
    return this.driver.findElement(
      By.css(selectors.decreaseChildAgeBtn)
    );
  }

  setNumberOfChildrenTo = async (number: number) => {
    for (let i = 0; i < number; i++) {
      let a = await this.driver.findElement(
        By.css(".btn-increase.increase-child")
      );
      await a.click();
    }
  };
}
