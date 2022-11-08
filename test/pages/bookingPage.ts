import { By, Builder, WebDriver, WebElement, until } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import selectors from "../pages/selectors/bookingPageSelectors.json";
import { config } from "dotenv";
import { DEFAULT_CHILD_AGE } from "../data/constants";

config();
const driver = new Builder()
  .forBrowser(process.env.BROWSER_TYPE)
  .setChromeOptions(
    new chrome.Options()
      .headless()
      .addArguments(
        `user-agent=${process.env.DEFAULT_BROWSER_AGENT}`,
        `window-size=${process.env.DEFAULT_SCREEN_SIZE}`
      )
  )
  .build();

export class BookingPage {
  url: string;
  driver: WebDriver;
  constructor() {
    this.url = process.env.BOOKING_PAGE_URL;
    this.driver = driver;
  }

  /**
   * Returns every child passenger age selector row
   *
   * @returns Promise<WebElement[]>
   */
  getChildrenAgeSelectorRows = (): Promise<WebElement[]> => {
    const rows = this.driver.findElements(
      By.css(selectors.childrenAgeSelectorRow)
    );

    return rows;
  };

  /**
   * Returns the nth child passenger age
   *
   * @param n
   * @returns Promise<string>
   */
  getNthChildAge = async (n: number = 1): Promise<string> => {
    const childAgeContainers = await this.driver.findElements(
      By.css(selectors.childAgeContainer)
    );

    return childAgeContainers[n - 1].getText();
  };

  /**
   * Opens the page
   *
   * @returns Promise<void>
   */
  open = async (): Promise<void> => {
    await this.driver.get(this.url);
  };

  /**
   * Clicks on an element accessed by the given selector
   *
   * @param selector
   * @returns Promise<void>
   */
  click = async (selector: string): Promise<void> => {
    const element = this.driver.findElement(By.css(selector));
    await this.driver.wait(until.elementIsEnabled(element));
    await element.click();
  };

  /**
   * Accepts cookies
   *
   * @returns Promise<void>
   */
  acceptCookies = async (): Promise<void> => {
    const acceptCookieBtns = await this.driver.findElements(
      By.css(selectors.acceptCookiesBtn)
    );
    if (acceptCookieBtns.length) {
      await this.click(selectors.acceptCookiesBtn);
    }
  };

  /**
   * Opens the passenger number selector dropdown
   *
   * @returns Promise<void>
   */
  openNumberOfPassengersSelector = async (): Promise<void> => {
    await this.click(selectors.passengersSelectorDropdown);
  };

  /**
   * Set the child age to the given number
   * @param age
   * @returns Promise<void>
   */
  setChildAgeTo = async (age: number): Promise<void> => {
    for (let i = 0; i < age - DEFAULT_CHILD_AGE; i++) {
      const increaseChildAgeBtn = await this.driver.wait(
        until.elementIsEnabled(
          this.driver.findElement(By.css(selectors.changeChildAgeBtns.increase))
        )
      );
      await increaseChildAgeBtn.click();
    }
  };

  /**
   * Returns the nth child age increase button
   *
   * @param nthChild
   * @returns Promise<WebElement>
   */
  getIncreaseChildAgeBtn = async (
    nthChild: number = 1
  ): Promise<WebElement> => {
    const increaseChildAgeBtns = await this.driver.findElements(
      By.css(selectors.changeChildAgeBtns.increase)
    );

    return increaseChildAgeBtns[nthChild - 1];
  };

  /**
   * Returns the nth child age decrease button
   *
   * @param nthChild
   * @returns Promise<WebElement>
   */
  getDecreaseChildAgeBtn = async (
    nthChild: number = 1
  ): Promise<WebElement> => {
    const decreaseChildAgeBtns = await this.driver.findElements(
      By.css(selectors.changeChildAgeBtns.decrease)
    );

    return decreaseChildAgeBtns[nthChild - 1];
  };

  /**
   * Returns the required child age modifying button
   * for the nth child
   *
   * @param type
   * @param nthChild
   *
   * @returns Promise<WebElement>
   */
  getChangeChildAgeBtn = async (
    type: "increase" | "decrease",
    nthChild: number = 1
  ): Promise<WebElement> => {
    const changeChildAgeBtns = await this.driver.findElements(
      By.css(selectors.changeChildAgeBtns[type])
    );

    return changeChildAgeBtns[nthChild - 1];
  };

  /**
   * Returns the required children number modifying button
   *
   * @param type
   * @returns WebElement
   *
   */
  getChangeChildrenNumbersBtn = (type: "increase" | "decrease"): WebElement => {
    const changeChildrenNumberBtn = this.driver.findElement(
      By.css(selectors.changeChildrenNumberBtns[type])
    );

    return changeChildrenNumberBtn;
  };

  /**
   * Sets the child passenger number
   *
   * @param number
   * @returns Promise<void>
   */
  setNumberOfChildrenTo = async (number: number): Promise<void> => {
    for (let i = 0; i < number; i++) {
      const increaseNumberOfChildrenBtn = await this.driver.wait(
        until.elementIsEnabled(this.getChangeChildrenNumbersBtn("increase"))
      );

      await this.driver.executeScript(
        "arguments[0].click()",
        increaseNumberOfChildrenBtn
      );
    }
  };
}
