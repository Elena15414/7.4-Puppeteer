const {launch}= require("./jest-puppeteer.config");
const {verbose, preset} = require("./jest.config");
const { chromium } = require("puppeteer");

let page;

describe("Github page tests", () => {

  beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 15000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }), 15000;
});

describe("Github pricing tests", () => {

  beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/pricing");
});

afterEach(() => {
  page.close();
});

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Pricing · Plans for every developer · GitHub');
  }, 10000);

  test("The page contains Join for free button", async () => {
    const btnSelector = ".btn-muted-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, 15000, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Join for free")
  }, 70000);

    test("The page contains Join for free button click", async () => {
    const button = await page.$("header div div a");
    button.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('Pricing · Plans for every developer · GitHub');
  }, 15000);
});
