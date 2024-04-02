import {logoImg} from "../utils";

export function Navbar() {
    return (
        <>
        <header>
            <nav>
                <img src={logoImg}/>
                <div className="navigation">
                    <nav>View</nav>
                    <nav>Model</nav>
                    <nav>Steel</nav>
                    <nav>About</nav>
                </div>
                <img src={logoImg}/>
            </nav>
        </header>
        </>
    );
}
