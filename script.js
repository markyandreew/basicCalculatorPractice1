const displayBox = document.querySelector(".display"),
  displayInput = document.querySelector(".display-input"),
  displayResult = document.querySelector(".display-result"),
  buttons = document.querySelectorAll("button"),
  operators = ["%", "÷", "×", "-", "+"];
let input = "",
  result = "",
  lastCalculation = false;

// main function to handle calculator logix
const calculate = (btnValue) => {
  const lastChar = input.slice(-1),
    secondToLastChar = input.slice(-2, -1),
    withoutLastChar = input.slice(0, -1),
    isLastCharOperator = operators.includes(lastChar),
    isInvalidResult = ["Error", "Infinity"].includes(result);

  // handle equals
  if (btnValue === "=") {
    if (
      input === "" ||
      lastChar === "." ||
      lastChar === "(" ||
      (isLastCharOperator && lastChar !== "%") ||
      lastCalculation
    )
      return;

    const formattedInput = replaceOperators(input);
    try {
      const calculatedValue = eval(formattedInput);
      result = parseFloat(calculatedValue.toFixed(10)).toString();
    } catch {
      result = "Error";
    }

    input += btnValue;
    lastCalculation = true;
    displayBox.classList.add("active");
  }

  // handle AC
  else if (btnValue === "AC") {
    resetCalculator("");
  }

  // handle backspace
  else if (btnValue === "") {
    if (lastCalculation) {
      if (lastCalculation) resetCalculator("");
      resetCalculator(result.slice(0, -1));
    } else input = withoutLastChar;
  }

  // handle operators
  else if (operators.includes(btnValue)) {
    if (lastCalculation) {
      if (isInvalidResult) return;
      resetCalculator(result + btnValue);
    } else if (
      ((input === "" || lastChar === "(") && btnValue !== "-") ||
      input === "-" ||
      lastChar === "." ||
      (secondToLastChar === "(" && lastChar === "-") ||
      ((secondToLastChar === "%" || lastChar === "%") && btnValue === "%")
    )
      return;
    else if (lastChar === "%") input += btnValue;
    else if (isLastCharOperator) input = withoutLastChar + btnValue;
    else input += btnValue;
  }

  // handle decimal
  else if (btnValue === ".") {
    const decimalValue = "0.";
    if (lastCalculation) resetCalculator(decimalValue);
    else if (lastChar === "(" || lastChar === "%") input += "×" + decimalValue;
    else if (input === "" || isLastCharOperator || lastChar === "(")
      input += decimalValue;
    else {
      let lastOperatorIndex = -1;
      for (const operator of operators) {
        const index = input.lastIndexOf(operators);
        if (index > lastOperatorIndex) lastOperatorIndex = index;
      }
      if (!input.slice(lastOperatorIndex + 1).includes(".")) input += btnValue;
    }
  }

  // handle brackets
  

  // handle numbers
  else {
    if (lastCalculation) resetCalculator(btnValue);
    else input += btnValue;
  }

  // update display
  displayInput.value = input;
  displayResult.value = result;
  displayInput.scrollLeft = displayInput.scrollWidth;
};

const replaceOperators = (input) =>
  input.replaceAll("÷", "/").replaceAll("×", "*");

const resetCalculator = (newInput) => {
  input = newInput;
  result = "";
  lastCalculation = false;
  displayBox.classList.remove("active");
};

buttons.forEach((button) =>
  button.addEventListener("click", (e) => calculate(e.target.textContent))
);

// https://www.youtube.com/watch?v=8VuvvYOv3q0
