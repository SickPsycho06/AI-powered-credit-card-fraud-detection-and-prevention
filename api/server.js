const express = require('express');
const bodyParser = require('body-parser');
const { detectFraud } = require('../scripts/ai-model');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('src'));

app.post('/api/detect-fraud', (req, res) => {
    const transactionData = req.body;

    if (!transactionData) {
        return res.status(400).json({ error: 'No transaction data provided' });
    }

    const result = detectFraud(transactionData);
    res.json({ fraudDetected: result });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const historyTable = document.querySelector('#transaction-history tbody');

