import React from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

export default function App(props) {
	// socket.emit("join", "class1");
	socket.on("message", (msg) => console.log(msg));

	return (
		<form>
			<input type="text" id="room"></input>
			<button
				onClick={(e) => {
					e.preventDefault();
					socket.emit("join", document.getElementById("room").value);
				}}
			>
				join class
			</button>
			<br />
			<button
				onClick={(e) => {
					e.preventDefault();
					socket.emit("msg", "hi");
				}}
			>
				say Hi..
			</button>
		</form>
	);
}
