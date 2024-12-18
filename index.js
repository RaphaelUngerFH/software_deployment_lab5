const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());


// Only listen on execution and not for tests
if (require.main === module) {
    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    });
}

// Custom hasing algorithm
function customHashAlgorithm(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char; // Bit-Shift & addition
      hash = hash & hash; // Change to 32-Bit int
  }
  return hash.toString(16); // Output as Hex
}

// Route /checksum
app.post('/checksum', (req, res) => {
  const { input } = req.body;
  console.log(req)

  if (!input || typeof input !== 'string') {
      return res.status(400).json({ error: 'Please use a string.' });
  }

  const checksum = customHashAlgorithm(input);
  res.json({ checksum });
});
app.get('/', (_, res) => {
  res.send('Hello World!');
});

module.exports = app;