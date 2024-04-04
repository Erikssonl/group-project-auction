import "./App.css";
import Header from "./components/header";
import Home from './routes/Home';
import Sell from './routes/Sell';
import About from './routes/About';
import Switch from "./components/switch";



function App() {

  return (
    <>
    <Header />
    <Switch/>
    </>
  );
}

export default App;
