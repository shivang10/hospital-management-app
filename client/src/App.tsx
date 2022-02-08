import React from "react";

import {BrowserRouter as Router} from "react-router-dom";

import Homepage from "./homepage/homepage";


function App() {
    return (
        <Router>
            <Homepage></Homepage>
        </Router>
    );
}

export default App;
