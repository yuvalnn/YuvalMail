import { Link ,NavLink} from "react-router-dom"

export function AppHeader() {
    return (
<header className="app-header">
<section className="container">
    <h1>Log111</h1>


    <nav>
       <NavLink to="/">Home</NavLink>
       <NavLink to="/AboutUs">About</NavLink>
       <NavLink to="/Emails">Emails</NavLink>
    </nav>
</section>
</header>
)
}
