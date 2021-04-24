import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";
const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

class TodoPage {
  
  todoInput: By = By.className("new-todo");
  todos: By = By.css("li.todo");
  todoLabel: By = By.css("label");
  todoComplete: By = By.css("input");
  todoStar: By = By.className("star");
  starBanner: By = By.className("starred");
  clearCompletedButton: By = By.css("button.clear-completed");

  driver: WebDriver;

  //My page is always at a specific URL
  url: string = "https://devmountain.github.io/qa_todos/";

  //Adding the driver in here
  constructor(driver: WebDriver) {
    this.driver = driver;
  }
}
const tp = new TodoPage(driver);

describe("the todo app", () => {
  beforeEach(async () => {
    await driver.get(tp.url);
  });
  afterAll(async () => {
    await driver.quit();
  });
  it("can add a todo", async () => {
    //This will add a todo
    await driver.wait(until.elementLocated(tp.todoInput));
    await driver.findElement(tp.todoInput).sendKeys("Getting a carwash\n");
  });
  it("can remove a todo", async () => {
    //This will delete a todo from the list
    let myTodos = await driver.findElements(tp.todos);
    await myTodos
      .filter(async (todo) => {
        (await (await todo.findElement(tp.todoLabel)).getText()) ==
          "Paying Rent";
      })[0]
      .findElement(tp.todoComplete)
      .click();
    await (await driver.findElement(tp.clearCompletedButton)).click();
    myTodos = await driver.findElements(tp.todos);
    let myTodo = await myTodos.filter(async (todo) => {
      (await (await todo.findElement(tp.todoLabel)).getText()) == "Paying Rent";
    });
    expect(myTodo.length).toEqual(0);
  });
  it("can mark a todo with a star", async () => {
    //This test starts out like adding/removing; we add a todo, then find it and
    //do something; in this case, we click the "star"

    await driver.wait(until.elementLocated(tp.todoInput));
    let startStars = await (await driver.findElements(tp.starBanner)).length;

    await driver.findElement(tp.todoInput).sendKeys("Going to the market\n");
    await (await driver.findElements(tp.todos))
      .filter(async (todo) => {
        (await (await todo.findElement(tp.todoLabel)).getText()) ==
          "Going to the market";
      })[0]
      .findElement(tp.todoStar)
      .click();
    let endStars = await (await driver.findElements(tp.starBanner)).length;
    expect(endStars).toBeGreaterThan(startStars);
  });

  
});