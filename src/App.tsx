import React from 'react';

import "./styles.css"
import {Navbar} from "./components/Navbar";
import {Hero} from "./components/Hero";
import {Hightlights} from "./components/Hightlights";
import Models from "./components/Model";
import Features from "./components/Features";
function App() {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Hightlights/>
            <Models/>
            <Features/>
        </div>
    );
}

export default App;
