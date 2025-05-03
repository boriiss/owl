import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Image, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../features/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faSignOutAlt, faComment, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  onLoginClick: () => void;
  onFeedbackClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onFeedbackClick }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
          FakeStore
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Товары</Nav.Link>
            
            {isAuthenticated && (
              <Nav.Link as={Link} to="/profile">Профиль</Nav.Link>
            )}
          </Nav>
          
          <Nav className="ms-auto">
            <Button 
              variant="outline-light" 
              className="me-2"
              onClick={onFeedbackClick}
            >
              <FontAwesomeIcon icon={faComment} className="me-2" />
              Обратная связь
            </Button>
            
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-user">
                  {user?.image ? (
                    <Image 
                      src={user.image} 
                      roundedCircle 
                      width="30" 
                      height="30" 
                      className="me-2"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                  )}
                  {user?.firstname || 'Профиль'}
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Мой профиль
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Выйти
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button 
                variant="outline-light" 
                onClick={onLoginClick}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                Войти
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;