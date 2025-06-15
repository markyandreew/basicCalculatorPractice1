const displayBox = document.querySelector(".display"),
  displayInput = document.querySelector(".display-input"),
  displayResult = document.querySelector(".display-result"),
  buttons = document.querySelectorAll("button"),
  operators = ["%", "÷", "×", "-", "+"];
let input = "",
  result = "",
  lastCalculation = false;

  // main function to handle calculator logix
const calculate = btnValue => {
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
        isLastCharOperator && lastChar!== "%" ||
        lastCalculation
    ) return;


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
        resetCalculator(result.slice(0, -1));
      }
      else input = withoutLastChar;
    }



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
