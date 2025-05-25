import './App.css';
import SplashCursor from './Components/SplashCursor/SplashCursor.jsx'
import { TicTack } from './Components/TickTack/TicTack';
import Aurora from "./Components/Aurora/Aurora.jsx"
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Footer } from './Components/Footer/Footer.jsx';

function App() {
  return (
    <div className="App">
      <SplashCursor />
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <TicTack/>
      <Footer/>
    </div>
  );
}

export default App;
