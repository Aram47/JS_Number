import MyNumber from "./MyNumber.mjs";

function runTest(testName, expected, actual) {
    const result = Object.is(expected, actual) ? "PASSED" : "FAILED";
    console.log(`${testName}: ${result}`);
    if (result === "FAILED") {
        console.log(`  Expected: ${expected}`);
        console.log(`  Actual: ${actual}`);
    }
}

function testMyNumber() {
    let num1 = new MyNumber(42);
    runTest("Constructor - Value", 42, num1.valueOf());
    runTest("Constructor - ToString", "42", num1.toString());

    let num2 = new MyNumber();
    runTest("Constructor - No Arguments", 0, num2.valueOf());

    runTest("Primitive Coercion", 42, MyNumber(42));
    runTest("Primitive Coercion - String", 42, MyNumber("42"));
    runTest("Primitive Coercion - NaN", true, isNaN(MyNumber("invalid")));

    runTest("parseInt - Decimal", 42, MyNumber.parseInt("42"));
    runTest("parseInt - Hexadecimal", 15, MyNumber.parseInt("0xF"));
    runTest("parseInt - Binary", 2, MyNumber.parseInt("10", 2));
    runTest("parseInt - Invalid Radix", true, isNaN(MyNumber.parseInt("42", 1)));
    runTest("parseInt - Non-Numeric", true, isNaN(MyNumber.parseInt("abc")));

    runTest("parseFloat - Integer", 42, MyNumber.parseFloat("42"));
    runTest("parseFloat - Decimal", 42.42, MyNumber.parseFloat("42.42"));
    runTest("parseFloat - Leading Whitespace", 42, MyNumber.parseFloat("  42"));
    runTest("parseFloat - Invalid", true, isNaN(MyNumber.parseFloat("abc")));

    runTest("toExponential", "4.2e+1", num1.toExponential());
    runTest("toFixed", "42.00", num1.toFixed(2));
    runTest("toLocaleString", "42", num1.toLocaleString("en-US"));
    runTest("toPrecision", "4.20e+1", num1.toPrecision(3));
    runTest("toString - Default", "42", num1.toString());
    runTest("toString - Binary", "101010", num1.toString(2));
    runTest("valueOf", 42, num1.valueOf());

    let num3 = new MyNumber(null);
    runTest("Edge Case - Null", 0, num3.valueOf());

    let num4 = new MyNumber(undefined);
    runTest("Edge Case - Undefined", NaN, num4.valueOf());
    runTest("Edge Case - Undefined (isNaN)", true, isNaN(num4.valueOf()));

    let num5 = new MyNumber({});
    runTest("Edge Case - Object", NaN, num5.valueOf());

    let num6 = new MyNumber(true);
    runTest("Edge Case - Boolean True", 1, num6.valueOf());

    let num7 = new MyNumber(false);
    runTest("Edge Case - Boolean False", 0, num7.valueOf());
}

testMyNumber();