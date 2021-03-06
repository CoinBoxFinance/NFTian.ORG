import logo from './logo.svg';
import './App.css';
import  './style/_header.scss';
import './style/icofont.min.css';
import './style/style.min.css';
import Login from './components/Login';
// import './style/.css';
import Dark_create from './components/Dark_create'
import Home from './components/Home';
import Homeone from './components/Homeone';
import Explore from './components/Explore';
// import old from './components/Authorold';

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
import { Layout } from './components/common/Layout'
import Details from './components/Details';
function App() {

  const WithHeader = (props) => {
    return(
      <Layout type="landing">
        {props.children}
      </Layout>
    )
  }
  return (
    <>
    <Router>
      {/* <Header /> */}
      <Switch>
     
        <Route exact={true} exact path="/"  component={() => <WithHeader>{<Home/>}</WithHeader>} />
        <Route exact={true} path="/homeone"      component={() => <WithHeader>{<Homeone/>}</WithHeader>} />
        <Route exact={true} path="/explore" component={() => <WithHeader>{<Explore/>}</WithHeader>} />
        <Route exact={true} path="/activity" component={() => <WithHeader>{<Activity/>}</WithHeader>} />
        <Route exact={true} path="/blog" component={() => <WithHeader>{<Blog/>}</WithHeader>} />
        <Route exact={true} path="/blog1" component={() => <WithHeader>{<Blog1/>}</WithHeader>} />
        <Route exact={true} path="/author"  component={() => <WithHeader>{<Author/>}</WithHeader>} /
        >
        <Route exact={true} path="/user/:userWalletAddress"  component={() => <WithHeader>{<Author/>}</WithHeader>} /
        >

        <Route exact={true} path="/nftdetails" component={() => <WithHeader>{<Nftdetails/>}</WithHeader>} />
        <Route exact={true} path="/wallet" component={() => <WithHeader>{<Wallet/>}</WithHeader>} />
        
        <Route exact={true} path="/signup" component={() => <WithHeader>{<Signup/>}</WithHeader>} />
        <Route exact={true} path="/signin" component={() => <WithHeader>{<Login/>}</WithHeader>} />
        <Route exact={true} path="/auction" component={() => <WithHeader>{<Auction/>}</WithHeader>} />
        <Route exact={true} path="/all-author" component={() => <WithHeader>{<Allauthor/>}</WithHeader>} />
        <Route exact={true} path="/forget-password" component={() => <WithHeader>{<Forgetpswd/>}</WithHeader>} />
        <Route exact={true} path="/item-details" component={() => <WithHeader>{<Itemdetails/>}</WithHeader>} />
        <Route exact={true} path="/nft/:token_id" component={() => <WithHeader>{<Details/>}</WithHeader>} />
        
      </Switch>
      {/* <Footer /> */}
    </Router>
    </>
  );
}

export default App;
