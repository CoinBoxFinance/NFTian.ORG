import logo from './logo.svg';
import './App.css';
import  './style/_header.scss';
import './style/icofont.min.css';
import './style/style.min.css';
import Login from './components/Login';
// import './style/.css';
import Header from './components/Header';
import Home from './components/Home';
import Homeone from './components/Homeone';
import Explore from './components/Explore';
import Footer from './components/Footer';
import Author from './components/Author';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Activity from './components/Activity';
import Blog from './components/Blog';
import Nftdetails from './components/Nftdetails';
import Wallet from './components/Wallet';
import Signup from './components/Signup';
import Blog1 from './components/Blog1';
import Auction from './components/Auction';
import Forgetpswd from './components/Forgetpassword';
import Allauthor from './components/Allauthor';
import Itemdetails from './components/Itemdetails';

function App() {
  return (
    <>
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route exact={true} exact path="/" component={Home} />
        <Route exact={true} path="/homeone"component={Homeone} />
        <Route exact={true} path="/explore"component={Explore} />
        <Route exact={true} path="/activity"component={Activity} />
        <Route exact={true} path="/blog"component={Blog} />
        <Route exact={true} path="/blog1"component={Blog1} />
        <Route exact={true} path="/author"component={Author} />
        <Route exact={true} path="/nftdetails"component={Nftdetails} />
        <Route exact={true} path="/wallet"component={Wallet} />
        <Route exact={true} path="/signup"component={Signup} />
        <Route exact={true} path="/auction"component={Auction} />
        <Route exact={true} path="/all-author"component={Allauthor} />
        <Route exact={true} path="/forget-password"component={Forgetpswd} />
        <Route exact={true} path="/item-details"component={Itemdetails} />
        
      </Switch>
      {/* <Footer /> */}
    </Router>
    </>
  );
}

export default App;
