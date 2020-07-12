const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
let users = 0;

app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

io.on("connection", (socket) => {
	users++;
	console.log("total live users: " + users);
	socket.on("disconnect", () => {
		users--;
		console.log("total live users: " + users);
	});
	socket.on("join", (room) => {
		socket.join(room);
		console.log("joined " + room);
		socket.on("msg", (msg) => {
			io.to(room).emit("message", msg);
		});
	});
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT || 4000, () => console.log("4000"));
