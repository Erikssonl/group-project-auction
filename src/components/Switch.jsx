import {Routes, Route} from react-router-dom;
import Home from './routes/Home';
import Sell from './routes/Sell';
import About from './routes/About';

const Switch = () => {
    return (
        <div className="routes-wrapper">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/sell" element={<Sell/>} />
                <Route path="/about" element={<About/>} />
                <Route render={()=><h1>404: page not found </h1>} />
            </Routes>
        </div>
    )
    
}

export default Switch