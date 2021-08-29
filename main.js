const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");
const server = http.createServer(app);
const io = require("socket.io")(server);
const path = require("path");
let content;
app.get("/", function (req, res) {
  res.send("Hello World");
});

let fpath = path.join(__dirname, "log.txt");
content = fs.readFileSync(fpath).toString();

app.get("/log", function (req, res) {
  const toSend = last10Line(content,1);
  res.send(`<pre>${toSend}</pre>`);
});

function last10Line(content, val) {
  let arr = content.replace(/\r\n/g, "\n").split("\n");

  // for(let i of arr) {
  //     console.log(i);
  // }
  if (val == 1) {
    if (arr.length > 10) {
      arr = arr.slice(arr.length - 10);
    }
    //console.log(arr.length)
  } else {
    arr = arr.slice(arr.length - 1);
  }
 
  return arr.join("\n");
}


function watch() {
  fs.watch(fpath, function (ev, body) {
    console.log(ev, body + "");
    if (ev == "change") {
      content = fs.readFileSync(body).toString();
      line10Line(content, 2);
    } 
  });
}

io.on("connection", (client) => {
  client.on("event", (data) => {
    console.log(data);
  });
  client.broadcast.emit(data);
  client.on("disconnect", () => {
    console.log("shutdown IO");
  });
});

server.listen(3000);
