import {logoImg} from "../utils";

export function Navbar() {
    const handleClick = (componentName: string): void => {
        const component: HTMLElement | null = document.getElementById(componentName);
        if (component) {
            component.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
        <header>
            <nav>
                <img src={logoImg}/>
                <div className="navigation">
                    <nav onClick={() => handleClick('highlights')}>View</nav>
                    <nav onClick={() => handleClick('heading')}>Model</nav>
                    <nav onClick={() => handleClick('features')}>Steel</nav>
                    <nav onClick={() => handleClick('works')}>About</nav>
                </div>
                <img src={logoImg}/>
            </nav>
        </header>
        </>
    );
}
