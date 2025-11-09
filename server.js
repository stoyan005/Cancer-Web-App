const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlenconded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'info.html'));
});

app.get('/info', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'info.html'));
});

app.get('/risk', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'info.html'));
});

app.post('/result', (req, res) => {
	const { age, smoker, family_history, diet } = req.body;

	let score = 0;
	if (parseInt(age) > 40) score += 2;
	if (smoker === 'yes') score += 2;
	if (family_history === 'yes') score += 2;
	if (diet === 'poor') score += 1;

	let risk, advice;
	if (score >= 5) {
		risk = 'High Risk';
		advice = 'Please consult a doctor for screening soon.';
	} else if (score >= 3) {
		risk = 'Moderate Risk';
		advice = 'Consider lifestyle changes and regular checkups.';
	} else {
		risk = 'Low Risk';
		advice = 'Main a healthy lifestyle and diet.';
	}

	res.send(`
    <html>
    <head>
        <title>Your Cancer Risk Evaluation</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <h2>Your Cancer Risk Result</h2>
        <h3>${risk}</h3>
        <p>${adivce}</p>
        <a href="/risk">Take Test Again</a>
        <a href="/">Back Home</a>
    </body>
    </html>
    `);
});

app.listen(PORT, () => console.log(`Server running on https://localhost:${PORT}`));
