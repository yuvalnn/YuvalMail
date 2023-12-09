
import { Route, HashRouter as Router, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { AppHeader } from './cmps/Appheader';
import { AppFooter } from './cmps/AppFooter';
import { AboutUs } from './pages/AboutUs';

export function App() {

    return (
        <Router>
         <section className='main-app'>
            <AppHeader />
            <main className='container'>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/AboutUs' element={<AboutUs/>} />
                </Routes>
            </main>
 
                 
        </section>
             <AppFooter />
        </Router>
        

    )
}

