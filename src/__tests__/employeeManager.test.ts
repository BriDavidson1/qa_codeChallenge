import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });
  describe("Test adding at least one more employee", () => {
    it("1) can add a new employee", async () => {
      await em.addEmployee();
      await em.selectEmployeeByName("New Employee");
      await em.editEmployee({
        name: "Bernard Fromage",
        phone: "5555555555",
        title: "Nasa Janitor ",
      });
      await em.saveChanges();
      await em.selectEmployeeByName("Dollie Berry");
      await em.selectEmployeeByName("Bernard Fromage");
      let employee = await em.getEmployeeInfo();
      expect(employee.name).toEqual("Bernard Fromage");
      expect(employee.phone).toEqual("5555555555");
      expect(employee.title).toEqual("Nasa Janitor");
    });
    it("Test cancelling an edit of an employee and edit", async () => {
      await em.selectEmployeeByName("Bernice Ortiz");
      await em.editEmployee({ title: "Dog Petter" });
      await em.cancelChanges();
      let employee = await em.getEmployeeInfo();
      expect(employee).toEqual({
        id: 1,
        name: "Bernice Ortiz",
        phone: "4824931093",
        title: "CEO",
        //excpect same info to remain since we cancelled it out the saves should not persist
      });
    });
    it("Test that when editing and then navigating away without saving does not save changes.", async () => {
      await em.selectEmployeeByName("Bernice Ortiz");
      await em.editEmployee({ title: "Dog Petter" });
      await em.selectEmployeeByName("Eve Sparks");
      await em.selectEmployeeByName("Bernice Ortiz");
      let employee = await em.getEmployeeInfo();
      expect(employee).toEqual({
        id: 1,
        name: "Bernice Ortiz",
        phone: "4824931093",
        title: "CEO",
      });
    });
  });
});