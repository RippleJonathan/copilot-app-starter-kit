const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let items = [];

app.post('/items', (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'missing' });
  const item = { id: `item_${items.length + 1}`, name };
  items.push(item);
  res.status(201).json(item);
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const prev = items.length;
  items = items.filter((i) => i.id !== id);
  if (items.length === prev) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
});

module.exports = app;
