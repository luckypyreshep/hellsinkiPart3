// const http = require("http");

const persons = [
  {
    id: 1,
    name: "Arto Hellasfffdfdfdfdfdffff",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(persons));
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);
const express = require("express");

const app = express();

const port = 3001;

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.get("/persons", (req, res) => {
  res.json(persons);
});

app.get("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  console.log("hi");
  response.json(person);
});
/*--------------------*/
const infoPage = `Phonebook has info for ${persons.length}
<br/>
<br/>
${new Date()}`;

app.get("/info", (req, res) => {
  res.send(infoPage);
});
/*--------------------*/

app.listen(port, () => {
  console.log(`running on ${port}`);
});
