import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { RootPage } from "./pages/Root.js";

function Header() {
  return (
    <section className="hero is-danger">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            電話 
            <br className="is-hidden-tablet" />
            デモ 
          </h1>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer ">
      <div className="content">
        <p className="has-text-centered">
          デモ2021
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <section className="section has-background-warning-light">
        <div className="container">
          <div className="block has-text-right">
            <button className="button is-warning is-inverted is-outlined">
              ログイン
            </button>
          </div>
          <Route path="/" exact>
            <RootPage />
          </Route>
        </div>
      </section>
      <Footer />
    </Router>
  );
}

export default App;
