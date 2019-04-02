const [express, mongoose] = [require("express"), require("mongoose")];
const app = express();
const [book, member, transaction] = [
  require("./routes/book"),
  require("./routes/member"),
  require("./routes/transaksi")
];

//set up mongoDB
const dbName = "first-mongoose";
const mongoDB = `mongodb://localhost:27017/${dbName}`;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

// get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "mongoDB connection error"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/book", book);
app.use("/member", member);
app.use("/transaction", transaction);
app.get("/author", (req, res) => {
  console.log(req.query);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`connected at http://localhost:${PORT}`);
});
