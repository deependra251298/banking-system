if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const AllCustomer = require("./models/allCustomer");

dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("We are connected database.... by local Machine");
  })
  .catch((err) => {
    console.log("OH NO ERROR..........");
    console.log(err);
  });

const customers = [
  {
    name: "Prabhat kumar",
    email: "pkald@gmail.com",
    accountNumber: 12312311111,
    currentBalance: 100000,
  },
  {
    name: "Neeranaj",
    email: "neeranjan@gmail.com",
    accountNumber: 14446278723,
    currentBalance: 90000,
  },
  {
    name: "Tushar",
    email: "tushar@gmail.com",
    accountNumber: 12346662721,
    currentBalance: 880000,
  },
  {
    name: "durgesh",
    email: "durgesh@gmail.com",
    accountNumber: 20786278721,
    currentBalance: 50000,
  },
  {
    name: "Sonali",
    email: "sonali@gmail.com",
    accountNumber: 12779998721,
    currentBalance: 64000,
  },
  {
    name: "Mahima",
    email: "mahima@gmail.com",
    accountNumber: 99346279021,
    currentBalance: 74000,
  },
  {
    name: "Daud",
    email: "daud@gmail.com",
    accountNumber: 12346008721,
    currentBalance: 34000,
  },
  {
    name: "Sona",
    email: "sona@gmail.com",
    accountNumber: 45134627872,
    currentBalance: 49000,
  },
  {
    name: "Madan",
    email: "madan@gmail.com",
    accountNumber: 12382478721,
    currentBalance: 57000,
  },
  {
    name: "Savi",
    email: "savi@gmail.com",
    accountNumber: 30346278721,
    currentBalance: 79000,
  },
];

AllCustomer.insertMany(customers)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
