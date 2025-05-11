import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Chatbot from './pages/Chatbot'
import Groups from './pages/Groups'
import Help from './pages/Help'
import Meme_Generator from './pages/Meme_Generator'
import Mood_Tracker from './pages/Mood_Tracker'
import Quiz from './pages/Quiz'
import Relax from './pages/Relax'
import Sign_in from './pages/Sign_in'
import Sign_up from './pages/Sign_up'
import Header from './components/Header'
import Footer from './components/Footer'



function App() {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/sign-in" element={<Sign_in/>}/>
    <Route path="/sign-up" element={<Sign_up/>}/>
    <Route path="/chatbot" element={<Chatbot/>}/>
    <Route path="/groups" element={<Groups/>}/>
    <Route path="/help" element={<Help/>}/>
    <Route path="/meme-generator" element={<Meme_Generator/>}/>
    <Route path="/mood-tracker" element={<Mood_Tracker/>}/>
    <Route path="/quiz" element={<Quiz/>}/>
    <Route path="/relax" element={<Relax/>}/>
   </Routes>
  
  <Footer/>
   </BrowserRouter>
  )
}

export default App