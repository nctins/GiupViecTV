import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import InitRoutes from "./routes/router";
import socketioService from "./services/socketio.service";
import { socketVerifyToken } from "./middleware/verifyToken";
import DBTestConn from "./utils/DBTestConn";
import StartupTask from "./cron/StartupTask";

// init server
dotenv.config();
let PORT = process.env.PORT || 8080;
let app = express();
let httpServer = createServer(app);
const io = new Server(httpServer,{
  cors: {
    origin: "*", 
  }
});
global._socketio = io;

// config app
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(cors());

app.use(function(req, res, next) {    //CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, x-access-token, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
      res.send(200);
  }
  else {
      next();
  }
});

InitRoutes(app);
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

// socket connection
global._socketio.use(socketVerifyToken)
global._socketio.on("connection", socketioService.connection);


// start server
httpServer.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
  if (DBTestConn()) {
    // setup startup cron job
    StartupTask.run();
  }
});
