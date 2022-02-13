import React from "react";

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import ReactDOM from "react-dom";



import App from "./App";
import "./index.scss";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:5000/graphql"
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById("root")
);
