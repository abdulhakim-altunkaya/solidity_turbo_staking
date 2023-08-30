import { BrowserRouter as Router } from "react-router-dom";
import Upperbar from './components/Upperbar';
import Lowerbar from "./components/Lowerbar";

function App() {
  return (
    <div className="App">
      
      <Router>
            <Upperbar />
            <Lowerbar />
      </Router>

    </div>
  );
}

export default App;
