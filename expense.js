document.addEventListener("DOMContentLoaded", () => {
const loadHardcodedBtn = document.getElementById("loadHardcodedBtn");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const removeExpenseBtn = document.getElementById("removeExpenseBtn");
const expenseList = document.getElementById("expenseList");
const statusMessage = document.getElementById("statusMessage");
const addExpenseModal = document.getElementById("addExpenseModal");
const removeExpenseModal = document.getElementById("removeExpenseModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeRemoveModalBtn = document.getElementById("closeRemoveModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const cancelRemoveBtn = document.getElementById("cancelRemoveBtn");
const addExpenseForm = document.getElementById("addExpenseForm");
const removeExpenseForm = document.getElementById("removeExpenseForm");
const expenses = [
{ category: "Food", title: "Zakaria Street", amount: 3000, date: "2026-03-23" },
{ category: "Electronics", title: "Phone", amount: 20000, date: "2026-03-23" },
{ category: "Entertainment", title: "Movie Tickets", amount: 500, date: "2026-03-23" }
];
loadHardcodedBtn.addEventListener("click", () => {
statusMessage.textContent = "Loaded sample data successfully.";
renderExpenses(expenses);
});
// Modal functionality
addExpenseBtn.addEventListener("click", () => {
addExpenseModal.classList.remove("hidden");
});
closeModalBtn.addEventListener("click", () => {
addExpenseModal.classList.add("hidden");
addExpenseForm.reset();
});
cancelBtn.addEventListener("click", () => {
addExpenseModal.classList.add("hidden");
addExpenseForm.reset();
});
// Close modal when clicking outside the form
addExpenseModal.addEventListener("click", (e) => {
if (e.target === addExpenseModal) {
addExpenseModal.classList.add("hidden");
addExpenseForm.reset();
}
});
// Form submission
addExpenseForm.addEventListener("submit", async (e) => {
e.preventDefault();
const formData = new FormData(addExpenseForm);
const newExpense = {
title: formData.get("title"),
amount: parseFloat(formData.get("amount")),
category: formData.get("category")
};

try {
statusMessage.textContent = "Adding expense...";
await addExpenseToAPI(newExpense);
statusMessage.textContent = "Expense added successfully!";

// Fetch updated expenses from API
try {
const updatedExpenses = await getExpensesFromAPI();
renderExpenses(updatedExpenses);
} catch (fetchError) {
console.log("Could not fetch updated expenses, using local data");
renderExpenses(expenses);
}

} catch (error) {
console.error("Error adding expense:", error);
statusMessage.textContent = "Failed to add expense. Please try again.";
}

addExpenseModal.classList.add("hidden");
addExpenseForm.reset();
});

// Remove expense modal functionality
removeExpenseBtn.addEventListener("click", () => {
removeExpenseModal.classList.remove("hidden");
});

closeRemoveModalBtn.addEventListener("click", () => {
removeExpenseModal.classList.add("hidden");
removeExpenseForm.reset();
});

cancelRemoveBtn.addEventListener("click", () => {
removeExpenseModal.classList.add("hidden");
removeExpenseForm.reset();
});

removeExpenseModal.addEventListener("click", (e) => {
if (e.target === removeExpenseModal) {
removeExpenseModal.classList.add("hidden");
removeExpenseForm.reset();
}
});

// Remove expense form submission
removeExpenseForm.addEventListener("submit", async (e) => {
e.preventDefault();
const formData = new FormData(removeExpenseForm);
const expenseId = formData.get("id");

try {
statusMessage.textContent = "Removing expense...";
await removeExpenseFromAPI(expenseId);
statusMessage.textContent = "Expense removed successfully!";

// Fetch updated expenses from API
try {
const updatedExpenses = await getExpensesFromAPI();
renderExpenses(updatedExpenses);
} catch (fetchError) {
console.log("Could not fetch updated expenses, using local data");
renderExpenses(expenses);
}

} catch (error) {
console.error("Error removing expense:", error);
statusMessage.textContent = "Failed to remove expense. Please try again.";
}

removeExpenseModal.classList.add("hidden");
removeExpenseForm.reset();
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