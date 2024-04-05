import React from 'react';

import "./styles.css"
import {Navbar} from "./components/Navbar";
import {Hero} from "./components/Hero";
import {Hightlights} from "./components/Hightlights";
import {Model} from "./components/Model";
import {Features} from "./components/Features";
import {Works} from "./components/Works";
import {Footer} from "./components/Footer";
function App() {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Hightlights/>
            <Model/>
            <Features/>
            <Works/>
            <Footer/>
        </div>
    );
}

export default App;
