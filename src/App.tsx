import React, { type FC, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserProfilePage from './pages/UserProfilePage';
import AuthModal from './components/AuthModal';
import FeedbackForm from './components/FeedbackForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <Navbar
          onLoginClick={() => setShowAuthModal(true)}
          onFeedbackClick={() => setShowFeedbackModal(true)}
        />
        
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Routes>
        </div>
        
        <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
        <FeedbackForm show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} />
      </Router>
    </Provider>
  );
};

export default App;