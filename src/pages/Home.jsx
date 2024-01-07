import imgUrl from '../assets/imgs/react.png'
import { Link } from 'react-router-dom'
export function Home() {
    return (
        <section className="home">
            <h1>Welcome to YuvalMail Hub! 📧 Your central station for managing emails with ease.</h1>
            <img src={imgUrl} alt="" />
            <Link   to={`/email/inbox?compose=new?to=help@gmail.com&subject=Help`} >
             <button>help</button>
           </Link>
        </section>
    )
}
