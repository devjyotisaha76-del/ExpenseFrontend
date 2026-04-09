document.addEventListener("DOMContentLoaded", () => {
const loadApiBtn = document.getElementById("loadApiBtn");
const expenseList = document.getElementById("expenseList");
const statusMessage = document.getElementById("statusMessage");
loadApiBtn.addEventListener("click", async () => {
statusMessage.textContent = "Loading expenses from API...";
expenseList.innerHTML = "";
try {
const response = await fetch("http://127.0.0.1:8000/expenses");
if (!response.ok) {
throw new Error("HTTP error: " + response.status);
}
const data = await response.json();
statusMessage.textContent = "Expenses loaded successfully.";
renderExpenses(data);
} catch (error) {
console.error("Error:", error);
statusMessage.textContent = "Failed to fetch data.";
expenseList.innerHTML = "<p style='color:red;'>Error loading expenses.</p>";
}
});
});

function renderExpenses(data) {
const expenseList = document.getElementById("expenseList");
expenseList.innerHTML = "";
if (!data || data.length === 0) {
expenseList.innerHTML = "<p>No expenses found.</p>";
return;
}
data.forEach(exp => {
const card = document.createElement("div");
card.className = "expense-card";
card.innerHTML = `
<div class="expense-title">${exp.title}</div>
<div class="expense-category">${exp.category}</div>
<div class="expense-amount">₹ ${exp.amount}</div>
<div class="expense-date">${exp.date}</div>
`;
expenseList.appendChild(card);
});
}

// Function to add expense via API
async function addExpenseToAPI(expenseData) {
try {
const response = await fetch(`http://127.0.0.1:8000/expenses?title=${encodeURIComponent(expenseData.title)}&amount=${expenseData.amount}&category=${encodeURIComponent(expenseData.category)}`, {
method: "POST"
});

if (!response.ok) {
throw new Error("HTTP error: " + response.status);
}

return await response.json();
} catch (error) {
throw error;
}
}

// Function to get expenses from API
async function getExpensesFromAPI() {
const response = await fetch("http://127.0.0.1:8000/expenses");
if (!response.ok) {
throw new Error("HTTP error: " + response.status);
}
return await response.json();
}

// Function to remove expense via API
async function removeExpenseFromAPI(expenseId, expenseTitle) {
try {
const response = await fetch(`http://127.0.0.1:8000/expenses/${expenseId}`, {
method: "DELETE"
});

if (!response.ok) {
throw new Error("HTTP error: " + response.status);
}

return await response.json();
} catch (error) {
throw error;
}
}

// Make functions globally available
window.addExpenseToAPI = addExpenseToAPI;
window.getExpensesFromAPI = getExpensesFromAPI;
window.removeExpenseFromAPI = removeExpenseFromAPI;
