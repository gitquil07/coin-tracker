import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux";
import MarketList from "./pages/MarketList";
import CoinDetail from "./pages/CoinDetail";
import Search from "./pages/Search";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MarketList />} />
          <Route path="/search" element={<Search />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
