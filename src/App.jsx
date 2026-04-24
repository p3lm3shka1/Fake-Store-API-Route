import { Routes, Route, BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/cartContext";

import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import AddProduct from "./pages/AddProduct/AddProduct";

import NotFoundPage from "./pages/NotFound/NotFoundPage";
import "./App.scss";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <section className="app-container">
          <Navigation />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </section>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
