const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = 9000;
const SERVER = APP.listen(PORT, (req, res) => {
	console.log(`server is listening to port ${PORT}`);
});
const IO = require("socket.io")(SERVER);

let color = "";

// for image/js/css
APP.use(EXPRESS.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
APP.set("views", __dirname + "/views");
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
APP.set("view engine", "ejs");
// use app.get method and pass it the base route '/' and a callback

IO.on("connection", function (socket) {
	console.log(`a user is connected`);
	socket.on("green", function (data) {
		console.log(data.msg);
		color = "#2e7d32 ";
		socket.emit("color", { data: color });
		socket.broadcast.emit("color", { data: color });
	});

	socket.on("blue", function (data) {
		console.log(data.msg);
		color = "#0277bd ";
		socket.emit("color", { data: color });
		socket.broadcast.emit("color", { data: color });
	});

	socket.on("pink", function (data) {
		console.log(data.msg);
		color = "#ad1457 ";
		socket.emit("color", { data: color });
		socket.broadcast.emit("color", { data: color });
	});

	socket.on("new_connection", function (data) {
		console.log(data.msg);
		socket.emit("color", { data: color });
		// socket.broadcast.emit("color", { data: color });
	});

	socket.on("connection", function () {
		console.log(`a user is connected coneccted`);
	});

	socket.on("disconnect", function () {
		console.log(`a user is disconnected`);
	});
});

APP.get("/", (req, res) => {
	res.render("index");
});

// APP.listen(PORT, (req, res) => {
// 	console.log(`Server is listening to ${PORT}`);
// });
