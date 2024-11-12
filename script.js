// script.js

let expenses = [];

document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();
    addExpense();
    updateChart();
});

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;

    const expense = { name, amount, category };
    expenses.push(expense);

    document.getElementById('expense-form').reset();
    renderExpenses();
}

function renderExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const item = document.createElement('div');
        item.className = 'expense-item';
        item.innerHTML = `
            ${expense.name} - ${expense.category} - $${expense.amount.toFixed(2)}
        `;
        expenseList.appendChild(item);
    });
}

function updateChart() {
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const categorySums = categories.map(category =>
        expenses.filter(expense => expense.category === category)
                .reduce((sum, expense) => sum + expense.amount, 0)
    );

    const ctx = document.getElementById('expense-chart').getContext('2d');
    if (window.expenseChart) window.expenseChart.destroy();

    window.expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: categorySums,
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
            }]
        },
        options: {
            responsive: true
        }
    });
}
