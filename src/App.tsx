import React from 'react';

import "./styles.css"
import "./media.css"
import "./index.css"
import {Navbar} from "./components/Navbar";
import {Hero} from "./components/Hero";
import {Hightlights} from "./components/Hightlights";
import {Model} from "./components/Model";
import {Features} from "./components/Features";
import {Works} from "./components/Works";
import {Footer} from "./components/Footer";
function App() {
    function handleClick (componentName: string): void  {
        const component: HTMLElement | null = document.getElementById(componentName);
        if (component) {
            component.scrollIntoView({behavior: 'smooth'});
        }
    }
    return (
        <div>
            <Navbar handleClick={handleClick}/>
            <Hero handleClick={handleClick}/>
            <Hightlights/>
            <Model/>
            <Features/>
            <Works/>
            <Footer/>
        </div>
    );
}

export default App;
