// const {ApolloServer} = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const resolvers = require("./graphQlSchema/resolvers");
const typeDefs = require("./graphQlSchema/type-defs");
const {graphqlHTTP} = require("express-graphql");
const {buildSchema} = require("graphql");

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

const schema = buildSchema(typeDefs);
// async function startApolloServer(typeDefs, resolvers) {
//     const server = new ApolloServer({typeDefs, resolvers});
//     const app = express();
//     app.use(bodyParser.json());
//     app.use(cors());

//     await server.start();
//     server.applyMiddleware({app, path: "/graphql"});

//     app.get("/", (req, res) => {
//         res.send("server is running");
//     });

//     app.listen(5000, () => {
//         console.log("server is running");
//     });
// }

// startApolloServer(typeDefs, resolvers)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

app.get("/", (req, res) => {
    res.send("up and running");
});

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: resolvers,
}));


app.listen(5000, () => {
    console.log("running on 5000");
});

module.exports = app;
