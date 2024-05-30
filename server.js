const http = require("http");
const { Buffer } = require("buffer");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") return respondHello(req, res);
  if (req.url === "/user-agent") return respondUserAgent(req, res);
  if (req.url.startsWith("/base64/")) return respondBase64(req, res);

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not Found" }));
});

function respondHello(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ msg: "hello" }));
}

function respondUserAgent(req, res) {
  const userAgent = req.headers["user-agent"];
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ "user-agent": userAgent }));
}

function respondBase64(req, res) {
  const stringToEncode = req.url.split("/base64/")[1];
  const encodedString = Buffer.from(stringToEncode).toString("base64");
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ encoded: encodedString }));
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

if (require.main !== module) module.exports = server;
