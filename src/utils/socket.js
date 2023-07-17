import { io } from "socket.io-client";
const socket = io.connect("https://api.arosaje.com");
socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

export default socket;