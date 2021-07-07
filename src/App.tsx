import { Row } from "./components/row";

import { endpoints } from "./core/http";
import { Banner } from "./components/banner";
import { Navbar } from "./components/nav";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Row
        large
        title="Netflix Originals"
        urlEndpoint={endpoints.netflixOriginals}
      />
      <Row title="Top Rated" urlEndpoint={endpoints.topRated} />
      <Row title="Trending Now" urlEndpoint={endpoints.trending} />
      <Row title="Action Movies" urlEndpoint={endpoints.actionMovies} />
      <Row title="Documentaries" urlEndpoint={endpoints.docMovies} />
    </div>
  );
}

export default App;
