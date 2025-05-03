import React, { ReactNode, useMemo } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import { submitFeedback } from '../features/feedback/feedbackSlice';
import { format } from 'date-fns';

interface FeedbackFormValues {
  fullName: string;
  phone: string;
  email: string;
  date: Date;
  comment: string;
  userId?: number;
  birthday?: string;
}

interface FeedbackFormProps {
  show: boolean;
  onHide: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ show, onHide }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { isSubmitted } = useAppSelector((state) => state.feedback);

  const initialDate = useMemo(() => new Date(), []);

  const initialValues: FeedbackFormValues = {
    fullName: '',
    phone: '',
    email: '',
    date: initialDate,
    comment: '',
    ...(isAuthenticated && user && {
      userId: user.id,
      birthday: user.birthday,
    }),
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required('Обязательное поле')
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов'),
    phone: Yup.string()
      .required('Обязательное поле')
      .matches(/^\+?[0-9\s\-()]+$/, 'Некорректный номер телефона'),
    email: Yup.string()
      .email('Некорректный email')
      .required('Обязательное поле'),
    date: Yup.date()
      .required('Обязательное поле')
      .max(new Date(), 'Дата не может быть в будущем'),
    comment: Yup.string()
      .required('Обязательное поле')
      .min(10, 'Минимум 10 символов')
      .max(500, 'Максимум 500 символов'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = {
        ...values,
        date: format(values.date, 'yyyy-MM-dd')
      };
      dispatch(submitFeedback(formData));
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    formik.resetForm();
    onHide();
  };

  const handleDateChange = (date: Date | null) => {
    formik.setFieldValue('date', date || initialDate);
  };

  if (isSubmitted) {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
            Спасибо за обратную связь!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ваше сообщение успешно отправлено.</p>
          <div className="d-grid">
            <Button variant="primary" onClick={handleClose}>
              Закрыть
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Форма обратной связи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          {isAuthenticated && (
            <Alert variant="info" className="mb-3">
              Вы авторизованы как {user?.firstname} {user?.lastname}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>ФИО *</Form.Label>
            <Form.Control
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.fullName && !!formik.errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Телефон *</Form.Label>
                <Form.Control
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.phone && !!formik.errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Дата *</Form.Label>
            <DatePicker
              selected={formik.values.date}
              onChange={handleDateChange}
              onBlur={() => formik.setFieldTouched('date', true)}
              className={`form-control ${
                formik.touched.date && formik.errors.date ? 'is-invalid' : ''
              }`}
              dateFormat="dd.MM.yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={15}
              todayButton="Сегодня"
            />
            {formik.touched.date && formik.errors.date && (
              <div className="invalid-feedback d-block">
                {formik.errors.date as ReactNode}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Комментарий *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.comment && !!formik.errors.comment}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.comment}
            </Form.Control.Feedback>
          </Form.Group>

          {isAuthenticated && (
            <>
              <input type="hidden" name="userId" value={user?.id} />
              <input type="hidden" name="birthday" value={user?.birthday} />
            </>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} className="me-2" />
              Отмена
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
              {formik.isSubmitting ? 'Отправка...' : 'Отправить'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(FeedbackForm);