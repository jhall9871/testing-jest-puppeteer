const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

// Check two name and age inputs (unit test)
test("should output name and age", () => {
  const text = generateText("James", 36);
  expect(text).toBe("James (36 years old)");
  const text2 = generateText("sofia", 30);
  expect(text2).toBe("sofia (30 years old)");
});

// Check for false positives (unit test)
test("should ouput text without data", () => {
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
});

// (integration test)
test("should generate a valid text ouput", () => {
  const text = checkAndGenerate("James", 36);
  expect(text).toBe("James (36 years old)");
});

// End-to-end test with Puppeteer
test("should create an element with text and correct class", async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 20,
    // args: ["--window-size=700,400"]
  });
  const page = await browser.newPage();
  await page.goto(
    "file:///Users/jameshall/Desktop/wd-sites/professional-development/js-testing-introduction/index.html"
  );
  await page.click('input#name');
  await page.type('input#name', 'Joey');
  await page.click('input#age');
  await page.type('input#age', '22');
  await page.click('#btnAddUser')
  const finalText = await page.$eval('.user-item', el => el.textContent)
  expect(finalText).toBe('Joey (22 years old)');
}, 10000);
