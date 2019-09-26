const app = require("express")();
const { ExpressPeerServer } = require("peer");
const cors = require("cors");

app.use(cors());

const server = app.listen(9000, err =>
  err
    ? console.error(`An error has occured: \n${err}`)
    : console.log("Server running.")
);

const options = { debug: true };
const peerServer = ExpressPeerServer(server, options);

app.use("/", peerServer);

let connectedUsers = [];

app.get("/users", (_, res) => res.send(connectedUsers));

peerServer.on("connection", id => {
  console.log(`Connected: ${id}`);
  connectedUsers.push(id);
});
