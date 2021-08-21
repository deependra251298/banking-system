if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const AllCustomer = require("./models/allCustomer");
const History = require("./models/history");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("We are Connected DataBase Successfully....");
  })
  .catch((err) => {
    console.log("OH No Database Error.....");
    console.log(err);
  });

app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/banking", async (req, res) => {
  const customers = await AllCustomer.find({});
  let i = 1;
  res.render("all-customer", { customers, i });
});

app.get("/banking/transaction-history", async (req, res) => {
  const histories = await History.find({});
  i = 1;
  res.render("history-table", { histories, i });
});

app.get("/banking/:id", async (req, res) => {
  const { id } = req.params;
  const customer = await AllCustomer.findById(id);
  res.render("one-customer", { customer });
});

app.get("/banking/:id/transfer_money", async (req, res) => {
  const { id } = req.params;
  const customer = await AllCustomer.findById(id);
  const transCustomer = await AllCustomer.find({});
  res.render("transfer", { transCustomer, customer });
});

app.put("/banking/:id", async (req, res) => {
  const { id } = req.params;
  const amount = parseInt(req.body.amount);
  const customerAmount = await AllCustomer.findById(id);
  const currentBalance = customerAmount.currentBalance - amount;
  const customer = await AllCustomer.findByIdAndUpdate(
    id,
    { currentBalance },
    {
      runValidators: true,
      new: true,
    }
  );
  const { accountNumber } = req.body;
  const accountNumberParse = parseInt(accountNumber);
  const reciever = await AllCustomer.find({
    accountNumber: accountNumberParse,
  });

  const recieverId = reciever[0]._id;
  const recieverAmount = await AllCustomer.findById({ _id: recieverId });
  const recieverCurrentBalance = recieverAmount.currentBalance + amount;

  await AllCustomer.findByIdAndUpdate(
    { _id: recieverId },
    { currentBalance: recieverCurrentBalance },
    {
      runValidators: true,
      new: true,
    }
  );

  const senderAccount = customerAmount.accountNumber;
  const senderName = customerAmount.name;
  const recieverName = recieverAmount.name;
  const recieverAccount = recieverAmount.accountNumber;
  const storedata = new History({
    createdDate: Date.now(),
    amount: amount,
    senderAccount: senderAccount,
    senderName: senderName,
    recieverAccount: recieverAccount,
    recieverName: recieverName,
  });
  await storedata.save();
  res.redirect(`/banking/${customer._id}`);
});

app.all("*", (req, res) => {
  res.send("Oh No page found !!");
});

const port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
  console.log(`My Server is runnig on ${port}`);
});
