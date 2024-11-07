require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const workspaceRoutes = require('./routes/workspace');
const taskRoutes = require('./routes/task');
const healthRoutes = require('./routes/health')

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/workspace', workspaceRoutes);
app.use('/task', taskRoutes);
app.use('/health',healthRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server up and running', PORT);
});
