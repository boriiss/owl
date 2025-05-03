import React from 'react';
import { Card, Button, Spinner, Alert, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faBirthdayCake, 
  faMapMarkerAlt,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../features/auth/authSlice';

const UserProfilePage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!isAuthenticated) {
    return (
      <div className="container mt-5">
        <Alert variant="warning" className="text-center">
          <h4>Доступ запрещен</h4>
          <p>Для просмотра профиля необходимо авторизоваться</p>
          <a href="/">На главную</a>
        </Alert>
      </div>
    );
  }

  if (isLoading || !user) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Профиль пользователя
              </h3>
            </Card.Header>
            
            <Card.Body>
              <Row className="mb-4">
                <Col xs={12} className="text-center">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Аватар"
                      className="rounded-circle mb-3"
                      width="120"
                      height="120"
                    />
                  ) : (
                    <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: '120px', height: '120px' }}>
                      <FontAwesomeIcon icon={faUser} size="3x" className="text-secondary" />
                    </div>
                  )}
                  <h4>{user.firstname} {user.lastname}</h4>
                  <Badge bg="info" className="fs-6 mt-2">
                    ID: {user.id}
                  </Badge>
                </Col>
              </Row>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <FontAwesomeIcon icon={faEnvelope} fixedWidth className="me-2 text-primary" />
                  <strong>Email:</strong> {user.email || 'Не указан'}
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <FontAwesomeIcon icon={faPhone} fixedWidth className="me-2 text-primary" />
                  <strong>Телефон:</strong> {user.phone || 'Не указан'}
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <FontAwesomeIcon icon={faBirthdayCake} fixedWidth className="me-2 text-primary" />
                  <strong>Дата рождения:</strong> {user.birthday || 'Не указана'}
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth className="me-2 text-primary" />
                  <strong>Адрес:</strong> {user.address?.street 
                    ? `${user.address.street}, ${user.address.city}` 
                    : 'Не указан'}
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <FontAwesomeIcon icon={faIdCard} fixedWidth className="me-2 text-primary" />
                  <strong>Вебсайт:</strong> 
                  {user.website ? (
                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                      {user.website}
                    </a>
                  ) : 'Не указан'}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            
            <Card.Footer className="bg-light">
              <div className="d-flex justify-content-between">
              <Link to="/products" className="btn btn-outline-primary">
                Вернуться к товарам
              </Link>
                
                <Button 
                  variant="outline-danger" 
                  onClick={() => dispatch(logout())}
                >
                  Выйти из аккаунта
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfilePage;