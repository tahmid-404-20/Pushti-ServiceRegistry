const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());



// these are all the default values for the services
const services = {
  "Farmer":process.env.Farmer,
  "locationMs":process.env.locationMs,
  "sellMs":process.env.sellMs,
  "leaderboardMs":process.env.leaderboardMs,
  "productMs":process.env.productMs,
  "Vendor":process.env.Vendor,
  "Agent":process.env.Agent,
  "buyMs":process.env.buyMs,
  "loanMs":process.env.loanMs,
  "authentication":process.env.authentication,
  "Sme":process.env.Sme,
  "supportMs":process.env.supportMs,
  "Admin":process.env.Admin
};

// Endpoint to register a new service
app.post("/register", (req, res) => {
  const { name, url } = req.body;
  if (!name || !url) {
    res.status(400).send("Service name and URL are required");
  } else {
    services[name] = url;
    console.log(`Added service ${name} at url ${url}`);
    res.status(200).send(`Service ${name} registered successfully`);
  }
});

// Endpoint to deregister a service

app.post("/deregister", (req, res) => {
  const { name } = req.body;
  if (!name || !services[name]) {
    res.status(400).send("Service not found");
  } else {
    delete services[name];
    console.log(`Removed service ${name}`);
    res.status(200).send(`Service ${name} deregistered successfully`);
  }
});

// Endpoint to get the URL of a service
app.post("/get-service", (req, res) => {
  const serviceName = req.body.name;
  const url = services[serviceName];
  if (!url) {
    return res
      .status(200)
      .send({ success: false, message: "Service not found" });
  } else {
    return res.status(200).send({ success: true, url: url });
  }
});

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Service Registry running on port ${PORT}`);
});
