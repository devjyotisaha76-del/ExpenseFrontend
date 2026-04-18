document.addEventListener("DOMContentLoaded", () => {
const loadApiBtn = document.getElementById("loadApiBtn");
const expenseList = document.getElementById("expenseList");
const statusMessage = document.getElementById("statusMessage");
loadApiBtn.addEventListener("click", async () => {
statusMessage.textContent = "Loading expenses from API...";
expenseList.innerHTML = "";
try {
const data = await getExpensesFromAPI();
statusMessage.textContent = "Expenses loaded successfully.";
window.currentExpenses = data;
renderExpenses(data);
} catch (error) {
console.error("Error:", error);
statusMessage.textContent = "Failed to fetch data.";
expenseList.innerHTML = "<p style='color:red;'>Error loading expenses.</p>";
}
});
});

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
const response = await fetch(`http://127.0.0.1:8000/expenses/${expenseId}?title=${encodeURIComponent(expenseTitle)}`, {
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

// Function to register a user via API
async function registerUserToAPI(authData) {
try {
const response = await fetch("http://127.0.0.1:8000/users/register", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
username: authData.username,
password: authData.password
})
});

const result = await response.json();

if (!response.ok) {
throw new Error(result.detail || result.message || ("HTTP error: " + response.status));
}

return result;
} catch (error) {
throw error;
}
}

// Function to login a user via API
async function loginUserToAPI(authData) {
try {
const response = await fetch("http://127.0.0.1:8000/users/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
username: authData.username,
password: authData.password
})
});

const result = await response.json();

if (!response.ok) {
throw new Error(result.detail || result.message || ("HTTP error: " + response.status));
}

return result;
} catch (error) {
throw error;
}
}

// Make functions globally available
window.addExpenseToAPI = addExpenseToAPI;
window.getExpensesFromAPI = getExpensesFromAPI;
window.removeExpenseFromAPI = removeExpenseFromAPI;
window.registerUserToAPI = registerUserToAPI;
window.loginUserToAPI = loginUserToAPI;
