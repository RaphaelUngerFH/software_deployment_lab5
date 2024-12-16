const express = require('express');

const app = express();
const port = 3000;

// Only listen on execution and not for tests
if (require.main === module) {
    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    });
}

app.get('/', (_, res) => {
  res.send('Hello World!');
});

module.exports = app;