let { app, PORT } = require('./index.js');
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
