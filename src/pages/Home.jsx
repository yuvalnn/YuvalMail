import imgUrl from '../assets/imgs/react.png'

export function Home() {
    return (
        <section className="home">
            <h1>Welcome to YuvalMail Hub! 📧 Your central station for managing emails with ease.</h1>
            <img src={imgUrl} alt="" />
        </section>
    )
}
