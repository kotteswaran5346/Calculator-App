let result = document.getElementById("result");
let historyDisplay = document.getElementById("history");
let history = [];

function appendValue(value) {
  result.value += value;
}

function clearDisplay() {
  result.value = "";
}

function deleteLast() {
  result.value = result.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = result.value
      .replace(/√/g, "Math.sqrt")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log10")
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E")
      .replace(/\^/g, "**")
      .replace(/%/g, "/100");

    let answer = eval(expression);
    if (answer !== undefined && !isNaN(answer)) {
      history.push(`${result.value} = ${answer}`);
      if (history.length > 3) history.shift();
      historyDisplay.innerHTML = history.join("<br>");
      result.value = answer;
    }
  } catch (error) {
    result.value = "Error";
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || ["+", "-", "*", "/", ".", "%", "(", ")"].includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

// Toggle Scientific Mode
const toggleBtn = document.getElementById("toggleMode");
const normalButtons = document.getElementById("normalButtons");
const scientificButtons = document.getElementById("scientificButtons");

toggleBtn.addEventListener("click", () => {
  scientificButtons.classList.toggle("hidden");
  if (scientificButtons.classList.contains("hidden")) {
    toggleBtn.textContent = "Scientific";
  } else {
    toggleBtn.textContent = "Basic";
  }
});