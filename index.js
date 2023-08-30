// const http = require("http");

let persons = [
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
app.use(express.json());

const port = 3001;

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log("deleted");
  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(409).json({
      error: `${body.name} already exists in phonebook, please enter a unique name`,
    });
  } else if (body.number === undefined) {
    return response.status(400).json({
      error: `Missing phone number`,
    });
  } else {
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };
    persons = persons.concat(person);
    response.json(person);
  }
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
