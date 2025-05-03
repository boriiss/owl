import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, selectFilteredProducts, setPage, setSearchTerm } from '../features/products/productsSlice';
import { Pagination, Card, Form, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    filteredItems,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    searchTerm,
  } = useAppSelector((state) => state.products);
  
  const products = useAppSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Список товаров</h1>
      
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product: { id: React.Key | null | undefined; image: string | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string; price: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
          <Col key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description.substring(0, 100)}...</Card.Text>
                <Card.Text className="fw-bold">${product.price}</Card.Text>
                <Link to={`/products/${product.id}`} className="btn btn-primary">
                  Подробнее
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;