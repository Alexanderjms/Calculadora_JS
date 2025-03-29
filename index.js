document.addEventListener("DOMContentLoaded", () => {

    let display = document.getElementById("display");
    let buttons = document.querySelectorAll(".btn");

    let currentInput = "";
    let operator = "";
    let firstValue = "";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let value = button.textContent;

            if (!isNaN(value) || value === ".") {
                currentInput += value;
                display.textContent = firstValue + " " + operator + " " + currentInput;
            }

            else if (value === "C") {
                currentInput = "";
                operator = "";
                firstValue = "";
                display.textContent = "0";
            }
            
            else if (value === "=") {
                try {
                    let result = eval(currentInput);
                    display.textContent = result;
                    currentInput = result.toString();
                } catch (error) {
                    display.textContent = "Error";
                }
            }

            else if (value === "()") {
                // Contar paréntesis abiertos y cerrados en currentInput
                let openCount = (currentInput.match(/\(/g) || []).length;
                let closeCount = (currentInput.match(/\)/g) || []).length;
                
                if (openCount === closeCount) {
                    currentInput += "(";
                } else {
                    currentInput += ")";
                }
                display.textContent = firstValue + " " + operator + " " + currentInput;
            }
            

            else if (currentInput !== "" && !currentInput.endsWith(" ")) {
                currentInput += ` ${value.replace("x", "*").replace("÷", "/")} `;
                display.textContent = currentInput;
            }

            else {
                if (currentInput !== ""){
                    firstValue = currentInput;
                    operator = value.replace("x", "*").replace("÷", "/");
                    currentInput = "";
                    display.textContent = firstValue + " " + operator;
                }
            }
           
        });
    });
});
