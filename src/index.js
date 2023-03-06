const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [] 

app.post("/account", (request, response) => {
   const { cpf, name} = request.body;

   const customersAlreadyExist = customers.some((customer) => customer.cpf === cpf);

   if(customersAlreadyExist) {
    return response.status(400).json({message: "Customer already exists!"})
   }

   customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
   });
   return response.status(201).send();
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if(!customer) {
    return response.status(400).json({ error: "Customer not found"})
  }

  return response.json(customer.statement);
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT} `));