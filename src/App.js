import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { RootPage } from "./pages/Root.js";
import { MoviePage } from "./pages/Movie.js";

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
          <Link className="button" to="/"> 音声のみ版 </Link>
          <Link className="button" to="/movie"> 動画版 </Link>
          <Link className="button" to="/avator"> アバター版 </Link>
          <Route path="/" exact>
            <RootPage />
          </Route>
          <Route path="/movie" exact>
            <MoviePage />
          </Route>
        </div>
      </section>
      <Footer />
    </Router>
  );
}

export default App;
