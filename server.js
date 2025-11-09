const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/info', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'info.html'));
});

app.get('/risk', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'risk.html'));
});

app.get('/result', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'result.html'));
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
		advice = 'Maintain a healthy lifestyle and diet.';
	}

	res.redirect(`/result?risk=${encodeURIComponent(risk)}&advice=${encodeURIComponent(advice)}`);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
