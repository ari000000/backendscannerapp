const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 4000;

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

// Middleware, um JSON-Requests zu verarbeiten
app.use(bodyParser.json());

// Route, um alle Produkte zu holen
app.get('/getProducts', (req, res) => {
    fs.readFile('produkte.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Serverfehler beim Lesen der Datei.');
        }
        const produkte = JSON.parse(data || '[]');
        res.json(produkte);
    });
});

// Route, um ein neues Produkt hinzuzufügen
app.post('/setProducts', (req, res) => {
    const neuesProdukt = req.body;

    fs.readFile('produkte.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Serverfehler beim Lesen der Datei.');
        }

        let produkte = JSON.parse(data || '[]');
        if (Array.isArray(produkte)) {
            produkte = [];
        }
        produkte.push(neuesProdukt);

        fs.writeFile('produkte.json', JSON.stringify(produkte, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Serverfehler beim Speichern der Datei.');
            }
            res.status(201).send(neuesProdukt);
        });
    });
});
app.get('/', (req, res) => {
    res.send('Willkommen bei meiner Node-App!');
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});


