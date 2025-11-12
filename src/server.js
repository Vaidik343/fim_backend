const express = require('express')
const cors = require('cors');
const { connectDB } = require('./config/connectDB')
require('dotenv').config();
const http = require('http');
const PORT = process.env.PORT || 7000
const fs = require('fs')
const path  = require('path');
const logger = require('./utils/logger');
const { Server } = require('socket.io');
const { sequelize } = require('./models');
const app = express();
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("home page")
})

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
});

const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith('Routes.js')) {
    const route = require(path.join(routesPath, file));

    // Validate that the file exports a router
    if (route && typeof route === 'function') {
      app.use('/api', route);
      console.log(`✅ Loaded route: ${file}`);
    } else {
      console.warn(`⚠️ Skipped ${file}: not a valid router export`);
    }
  }
});
 

const startServer = async () => {
    try {
       await connectDB();
// await loadProcedures();
app.listen(PORT , () => {
    console.log(`server running on http://localhost:${PORT}`)
})

    } catch (error) {
        console.log("🚀 ~ startServer ~ error:", error)

    }
}
sequelize.sync({ alter: true }).then(() => logger.info('DB synced ✅'));
startServer();
