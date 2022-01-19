import './App.scss';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './components/Home';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
              <Route exact path='/' component={Home}/>
              {/* <Route path='/:id/cart' />
              <Route path='/:id' /> */}
        </Switch>
      </Router>
    </div>
  );
}

function Navbar() {
  return (
    <div className="nav">
      <Link className='link' to="/">STRONA GŁÓWNA</Link>
      {/* <Link to="/:id/cart">KOSZYK</Link> */}
    </div>
  );
}

export default App;
