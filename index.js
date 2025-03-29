document.addEventListener("DOMContentLoaded", () => {

    let display = document.getElementById("display");
    let buttons = document.querySelectorAll(".btn");

    let currentInput = "";
    let operator = "";
    let firstValue = "";

    function processInput(value) {
        if (value === "C") {
            currentInput = "";
            operator = "";
            firstValue = "";
            display.textContent = "0";
        } else if (value === "Del") {
            // Elimina el último carácter de currentInput
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || "0";
        } else if (value === "=") {
            if (currentInput.trim() === "") {
                display.textContent = "0";
            } else {
                try {
                    let result = eval(currentInput);
                    display.textContent = Number(result).toLocaleString('en-US');
                    currentInput = result.toString();
                } catch (error) {
                    display.textContent = "Error";
                }
            }
        } else if (value === "()") {
            // Cuenta paréntesis para determinar si agregar apertura o cierre
            let openCount = (currentInput.match(/\(/g) || []).length;
            let closeCount = (currentInput.match(/\)/g) || []).length;
            if (openCount === closeCount) {
                currentInput += "(";
            } else {
                currentInput += ")";
            }
            display.textContent = currentInput;
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput !== "" && !currentInput.endsWith(" ")) {
                currentInput += ` ${value} `;
                display.textContent = currentInput;
            }
        } else if (!isNaN(value) || value === ".") {
            currentInput += value;
            display.textContent = currentInput;
        }
    }

    // Manejador de eventos de teclado
    document.addEventListener("keydown", (event) => {
        const key = event.key;
        if (!isNaN(key) || key === ".") {
            processInput(key);
        } else if (key === "Enter") {
            processInput("=");
        } else if (key === "Escape") {
            processInput("C");
        } else if (["+", "-", "*", "/"].includes(key)) {
            processInput(key);
        } else if (key === "(" || key === ")") {
            processInput("()");
        } else if (key === "Backspace") {
            processInput("Del");
        }
    });

    // Manejador de clicks en botones
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            processInput(button.textContent);
        });
    });
});