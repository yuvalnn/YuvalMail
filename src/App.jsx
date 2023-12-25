
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { AppHeader } from './cmps/AppHeader';
import { AppFooter } from './cmps/AppFooter';
import { AboutUs } from './pages/AboutUs';
import { EmailIndex } from './pages/EmailIndex';
import { EmailDetails } from './pages/EmailDetails';
import { EmailCompose } from './pages/EmailCompose';
import { EmailFolderList } from './cmps/EmailFolderList';

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/aboutUs' element={<AboutUs />} />
                    <Route path='/email/:folder' element={<EmailIndex />} >

                          <Route path='/email/:folder/:emailId' element={<EmailDetails />} />
                          <Route path='/email/:folder/compose/' element={<EmailCompose/>} />
                    </Route>
                   
                    
                </Routes>
                
            </section>
            <AppFooter />
            
        </Router>


    )
}

