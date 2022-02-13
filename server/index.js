const {ApolloServer} = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const resolvers = require("./graphQlSchema/resolvers");
const typeDefs = require("./graphQlSchema/type-defs");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(`mongodb+srv://health-app:${process.env.MONGODBPASSWORD}@cluster0.ovly9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("connected to database");
});

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({typeDefs, resolvers});
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    await server.start();
    server.applyMiddleware({app, path: "/graphql"});

    app.get("/", (req, res) => {
        res.send("server is running");
    });

    app.listen(5000, () => {
        console.log("server is running");
    });
}

startApolloServer(typeDefs, resolvers)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = app;
