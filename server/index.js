import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import {resolvers} from "./graphQlSchema/resolvers.js";
import {typeDefs} from "./graphQlSchema/type-defs.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
    `mongodb+srv://health-app:${process.env.MONGODBPASSWORD}@cluster0.ovly9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.connection.once("open", () => {
    console.log("connected to database");
});

async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({typeDefs, resolvers})
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});

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

