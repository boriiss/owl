import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/fakerApi';
import { Card, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError(err? err.toString() : 'Ошибка');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!product) {
    return <Alert variant="warning">Товар не найден</Alert>;
  }

  return (
    <div className="container mt-4">
      <Link to="/products" className="btn btn-secondary mb-3">
        Назад к списку
      </Link>
      
      <Card>
        <Row className="g-0">
          <Col md={6}>
            <Card.Img variant="top" src={product.image} className="img-fluid" />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text className="fw-bold">Цена: ${product.price}</Card.Text>
              
              <div className="mt-4">
                <h5>Дополнительная информация:</h5>
                <ul>
                  <li>Категория: {product.category}</li>
                  <li>Рейтинг: {product.rating}</li>
                  <li>Количество на складе: {product.stock}</li>
                </ul>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetailPage;