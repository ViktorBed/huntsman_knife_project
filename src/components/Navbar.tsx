import {logoImg} from "../utils";
import {ScrollProps} from "../constants";



export function Navbar ({ handleClick }: ScrollProps) {

    return (
        <>
            <header>
                <nav>
                    <img src={logoImg} alt="knife logo"/>
                    <div className="navigation">
                        <nav onClick={() => handleClick('highlights')}>View</nav>
                        <nav onClick={() => handleClick('heading')}>Model</nav>
                        <nav onClick={() => handleClick('features_title')}>Steel</nav>
                        <nav onClick={() => handleClick('chip')}>About</nav>
                    </div>
                    <img src={logoImg} alt="knife logo"/>
                </nav>
            </header>
        </>
    );
}
