
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { AppHeader } from './cmps/AppHeader';
import { AppFooter } from './cmps/AppFooter';
import { AboutUs } from './pages/AboutUs';
import { EmailIndex } from './pages/EmailIndex';
import { EmailDetails } from './pages/EmailDetails';

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/AboutUs' element={<AboutUs />} />
                    <Route path='/Email' element={<EmailIndex />} />
                    <Route path='/Email/:emailId' element={<EmailDetails />} />
                </Routes>
                
            </section>
            <AppFooter />
            
        </Router>


    )
}

