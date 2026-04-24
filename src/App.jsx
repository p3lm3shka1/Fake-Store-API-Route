import { Routes, Route, BrowserRouter } from "react-router-dom";
<<<<<<< HEAD

import { CartProvider } from "./context/cartContext";

import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import AddProduct from "./pages/AddProduct/AddProduct";

import NotFoundPage from "./pages/NotFound/NotFoundPage";
=======
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
>>>>>>> 867737a41154b39644cdce3ce8476d5bc307d810
import "./App.scss";

function App() {
  return (
<<<<<<< HEAD
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
=======
    <BrowserRouter>
      <section className="app-container">
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </section>
    </BrowserRouter>
>>>>>>> 867737a41154b39644cdce3ce8476d5bc307d810
  );
}

export default App;
