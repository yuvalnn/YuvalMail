import { Link ,NavLink} from "react-router-dom"
import { emailService } from "../services/email.service"

export function AppHeader() {
    return (
<header className="app-header">
<section className="container">
    <h1>{emailService.getLoggedinUser().fullname}</h1>


    <nav>
       <NavLink to="/">Home</NavLink>
       <NavLink to="/AboutUs">About</NavLink>
       <NavLink to="/Email">Email</NavLink>
    </nav>
</section>
</header>
)
}
