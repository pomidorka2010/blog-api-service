app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is healthy' });
});