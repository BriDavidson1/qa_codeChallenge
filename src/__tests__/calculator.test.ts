import calculator from "../calculator";

// each of the objects in the dataset array has the pieces of a math problem.
// "add": x + y
// "subtract": x - y
// "multiply": x * y
// "divide": x / y
let dataset = [
  { x: 5, y: 10, method: "add" },
  { x: 5, y: 10, method: "subtract" },
  { x: 5, y: 10, method: "multiply" },
  { x: 5, y: 10, method: "divide" },
  { x: -12, y: 10000, method: "add" },
  { x: -12, y: 10000, method: "subtract" },
  { x: -12, y: 10000, method: "multiply" },
  { x: -12, y: 10000, method: "divide" },
  { x: 42, y: 0, method: "add" },
  { x: 42, y: 0, method: "subtract" },
  { x: 42, y: 0, method: "multiply" },
  { x: 42, y: 0, method: "divide" },
  { x: 81, y: 227, method: "add" },
  { x: 81, y: 227, method: "subtract" },
  { x: 81, y: 227, method: "multiply" },
  { x: 81, y: 227, method: "divide" },
];

describe("Calculator", () => {
  dataset.forEach((calc) => {
    test(`the ${calc.method} method with ${calc.x} and ${calc.y}`, () => {
      switch (calc.method) {
        case "add":
          expect(calculator.add(calc.x, calc.y)).toEqual(calc.x + calc.y);
          break;
        case "subtract":
          expect(calculator.subtract(calc.x, calc.y)).toEqual(calc.x - calc.y);
          break;
        case "multiply":
          expect(calculator.multiply(calc.x, calc.y)).toEqual(calc.x * calc.y);
          break;
        case "divide":
          expect(calculator.divide(calc.x, calc.y)).toEqual(calc.x / calc.y);
          break;
        default:
          console.log("CLOSE BUT NO CIGARS");
      }
    });
  });
});
