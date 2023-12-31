let sd = document.querySelector(".small-display");
let bd = document.querySelector(".big-display");
let eqnBuffer = "";
let result = "";

function displayUpdate() {
  sd.textContent = eqnBuffer;
  bd.textContent = result;
}

// Infix to postfix and evaluation of postfix functions
// are done with chatGPT help

function infixToPostfix(infix) {
  const precedence = {
    "+": 1,
    "-": 1,
    "×": 2,
    "÷": 2,
  };

  const isOperator = (ch) => ["+", "-", "×", "÷"].includes(ch);
  const peek = (stack) => stack[stack.length - 1];
  const output = [];
  const operators = [];

  infix = infix.replace(/\s+/g, ""); // Remove spaces, so the input string can be processed

  for (let i = 0; i < infix.length; i++) {
    const token = infix[i];

    if (isFinite(token)) {
      // If it's a number, add it to the output queue
      let num = token;
      while (isFinite(infix[i + 1])) {
        num += infix[++i];
      }
      output.push(num);
    } else if (token === ".") {
      // Handle decimal numbers
      if (isFinite(peek(output))) {
        output.push(output.pop() + "." + infix[++i]);
        while (isFinite(infix[i + 1])) {
          output[output.length - 1] += infix[++i];
        }
      } else {
        throw new Error("Syntax Error: Decimal point is not after a digit");
      }
    } else if (isOperator(token)) {
      // If it's an operator, pop operators from the stack to the output queue
      while (
        isOperator(peek(operators)) &&
        precedence[peek(operators)] >= precedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    } else if (token === "(") {
      // If it's a left bracket, push it to the stack
      operators.push(token);
    } else if (token === ")") {
      // If it's a right bracket, pop operators from the stack to the output queue until we hit the left bracket
      while (peek(operators) !== "(") {
        if (operators.length === 0) {
          throw new Error("Mismatched parentheses");
        }
        output.push(operators.pop());
      }
      operators.pop(); // Pop the left bracket from the stack
    } else {
      throw new Error(`Unknown token: ${token}`);
    }
  }

  // After we've processed all the input tokens, pop all the remaining operators to the output queue
  while (operators.length > 0) {
    if (peek(operators) === "(") {
      throw new Error("Mismatched parentheses");
    }
    output.push(operators.pop());
  }

  return output.join(" ");
}

function evaluatePostfix(expression) {
  const stack = [];
  const tokens = expression.split(/\s+/);

  const applyOperation = (operator, operand2, operand1) => {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "×":
        return operand1 * operand2;
      case "÷":
        if (operand2 === 0) {
          throw new Error("Division by zero.");
        }
        return operand1 / operand2;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  };

  tokens.forEach((token) => {
    if (!isNaN(parseFloat(token)) && isFinite(token)) {
      // If the token is a number, push it onto the stack
      stack.push(parseFloat(token));
    } else {
      // Otherwise, the token is an operator; pop two operands and apply the operator
      if (stack.length < 2) {
        throw new Error("Insufficient values in expression.");
      }
      const operand2 = stack.pop();
      const operand1 = stack.pop();
      const result = applyOperation(token, operand2, operand1);
      stack.push(result);
    }
  });

  if (stack.length !== 1) {
    throw new Error("The user input has too many values.");
  }

  return stack.pop();
}

function evaluate() {
  let postfix = infixToPostfix(eqnBuffer);
  result = evaluatePostfix(postfix);
  displayUpdate();
}

function buttonClick(key) {
  if (key === "AC") {
    eqnBuffer = "";
    result = "";
  } else if (key === "C") {
    eqnBuffer = eqnBuffer.slice(0, -1);
  } else if (key === "=") {
    evaluate();
  } else {
    eqnBuffer += key;
  }
  displayUpdate();
}
