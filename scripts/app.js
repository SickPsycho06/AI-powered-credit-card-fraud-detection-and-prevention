// src/scripts/app.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const resultDiv = document.getElementById('result');
    const historyTable = document.querySelector('#transaction-history tbody');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const cardNumber = document.getElementById('card-number').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const merchant = document.getElementById('merchant').value;
        const transactionTime = document.getElementById('transaction-time').value; // <-- Add this line

        const { isFraud, reasons, confidence } = detectFraud(cardNumber, amount, merchant, transactionTime); // <-- Pass transactionTime
        const transactionId = Math.floor(Math.random() * 1000000);

        displayResult(isFraud, transactionId, reasons, confidence); // <-- Pass reasons (array)
    });

    // Real-time validation for card number
    document.getElementById('card-number').addEventListener('input', (event) => {
        const cardNumber = event.target.value.replace(/-/g, ''); // Remove hyphens
        if (cardNumber.length !== 16) {
            event.target.style.borderColor = 'red';
        } else {
            event.target.style.borderColor = 'green';
        }
    });

    // Real-time validation for transaction amount
    document.getElementById('amount').addEventListener('input', (event) => {
        const amount = parseFloat(event.target.value);
        if (amount > 1000) {
            event.target.style.borderColor = 'red';
        } else {
            event.target.style.borderColor = 'green';
        }
    });

    // Card number auto-formatting with hyphens
    const cardInput = document.getElementById('card-number');
    cardInput.addEventListener('input', function(e) {
        let value = cardInput.value.replace(/\D/g, '').slice(0, 16); // Only digits, max 16
        let sections = [];
        for (let i = 0; i < value.length; i += 4) {
            sections.push(value.substr(i, 4));
        }
        cardInput.value = sections.join('-');
    });

    function detectFraud(cardNumber, amount, merchant, transactionTime) {
        let isFraud = false;
        let reasons = [];
        let confidence = 100;

        // Remove hyphens from card number for validation
        const sanitizedCardNumber = cardNumber.replace(/-/g, '');

        // Check card number length
        if (sanitizedCardNumber.length !== 16) {
            isFraud = true;
            reasons.push('Invalid card number length. Card numbers must be 16 digits.');
            confidence -= 30; // Reduce confidence
        }

        // Check if card number contains only digits
        if (!/^\d+$/.test(sanitizedCardNumber)) {
            isFraud = true;
            reasons.push('Card number contains invalid characters. Only digits are allowed.');
            confidence -= 20; // Reduce confidence
        }

        // Check transaction amount
        if (amount > 1000) {
            isFraud = true;
            reasons.push('Transaction amount exceeds the allowed limit of $1000.');
            confidence -= 40; // Reduce confidence
        }

        // Check for suspicious merchant names
        const suspiciousMerchants = ['suspicious', 'fraudulent', 'unknown'];
        if (suspiciousMerchants.includes(merchant.toLowerCase())) {
            isFraud = true;
            reasons.push('Merchant flagged as suspicious.');
            confidence -= 20; // Reduce confidence
        }

        // Check for high-risk transaction times (e.g., late-night transactions)
        const currentHour = new Date().getHours();
        if (currentHour >= 0 && currentHour <= 5) {
            isFraud = true;
            reasons.push('Transaction occurred during high-risk hours (midnight to 5 AM).');
            confidence -= 15; // Reduce confidence
        }

        // Unusual timing: flag transactions between 0:00 and 5:00 as fraudulent
        const hour = parseInt(transactionTime.split(':')[0], 10);
        if (hour >= 0 && hour <= 5) {
            isFraud = true;
            reasons.push('Fraudulent Transaction! Unusual timing detected (midnight to 5 AM).');
            confidence -= 20;
        }

        // Check for repeated transactions with the same card number in a short time
        const recentTransactions = JSON.parse(localStorage.getItem('recentTransactions')) || [];
        const now = Date.now();
        const timeThreshold = 5 * 60 * 1000; // 5 minutes
        const repeatedTransaction = recentTransactions.some(
            (transaction) => transaction.cardNumber === sanitizedCardNumber && now - transaction.timestamp < timeThreshold
        );

        if (repeatedTransaction) {
            isFraud = true;
            reasons.push('Repeated transactions detected with the same card number in a short time.');
            confidence -= 25; // Reduce confidence
        }

        // Save the current transaction to recent transactions
        recentTransactions.push({ cardNumber: sanitizedCardNumber, timestamp: now });
        localStorage.setItem('recentTransactions', JSON.stringify(recentTransactions));

        // If no fraud detected, return safe
        if (!isFraud) {
            reasons.push('Transaction is safe.');
        }

        return { isFraud, reasons, confidence };
    }

    function displayResult(isFraud, transactionId, reasons, confidence) {
        const status = isFraud ? 'Fraudulent' : 'Safe';
        const statusColor = isFraud ? 'red' : 'green';

        resultDiv.innerHTML = `
            <p style="color: ${statusColor};">
                <strong>${status} Transaction!</strong><br>
                Transaction ID: ${transactionId}<br>
                Reasons:<br>
                ${reasons.map(r => `- ${r}`).join('<br>')}<br>
                Confidence Score: ${confidence}%
            </p>`;

        // Add transaction to history
        const cardNumber = document.getElementById('card-number').value;
        const amount = document.getElementById('amount').value;
        const merchant = document.getElementById('merchant').value;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transactionId}</td>
            <td>${cardNumber}</td>
            <td>$${amount}</td>
            <td>${merchant}</td>
            <td style="color: ${statusColor};">${status}</td>
        `;
        historyTable.appendChild(row);
    }

    document.getElementById('toggle-dark-mode').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    function exportHistory() {
        let csvContent = 'Transaction ID,Card Number,Amount,Merchant,Status\n';
        const rows = document.querySelectorAll('#transaction-history tbody tr');
        rows.forEach((row) => {
            const columns = row.querySelectorAll('td');
            const rowData = Array.from(columns).map((col) => col.textContent).join(',');
            csvContent += rowData + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transaction_history.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Add a button to export history
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export History';
    exportButton.addEventListener('click', exportHistory);
    document.getElementById('history-section').appendChild(exportButton);
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const homeSection = document.querySelector('#home-section');
    const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;

    if (window.scrollY < homeSectionBottom) {
        // Dark background with bright text
        nav.style.backgroundColor = 'black';
        navLinks.forEach(link => link.style.color = 'white');
    } else {
        // Bright background with dark text
        nav.style.backgroundColor = 'white';
        navLinks.forEach(link => link.style.color = 'black');
    }
});