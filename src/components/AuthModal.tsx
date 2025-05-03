import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout } from '../features/auth/authSlice';

interface AuthModalProps {
  show: boolean;
  onHide: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onHide }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isAuthenticated ? 'Вы авторизованы' : 'Авторизация'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : isAuthenticated ? (
          <div>
            <p>Добро пожаловать, {user?.firstname}!</p>
            <Button variant="danger" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        ) : (
          <div>
            <p>Для авторизации нажмите кнопку ниже:</p>
            <Button variant="primary" onClick={handleLogin}>
              Войти
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;