import React from 'react';

import "./styles.css"
import {Navbar} from "./components/Navbar";
import {Hero} from "./components/Hero";
import {Hightlights} from "./components/Hightlights";

function App() {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Hightlights/>
        </div>
    );
}

export default App;
