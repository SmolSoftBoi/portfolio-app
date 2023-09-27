import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios, { AxiosError } from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send a POST request to the API route
      const response = await axios.post<{ message: string }>('/api/contact', formData);

      // Handle success
      alert(response.data.message);
    } catch (error: any) {
      // Handle error
      console.error(error);
      const errorMessage = error.response?.data?.error as string;
      alert(errorMessage || 'An error occurred.');
    }
  };


  return (
    <Container className='mt-5'>
      <Row>
        <Col className='text-center mb-5'>
          <h1>Contact Me</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Subject</Form.Label>
              <Form.Control type='text' name='subject' value={formData.subject} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Message</Form.Label>
              <Form.Control as='textarea' rows={3} name='message' value={formData.message} onChange={handleChange} required />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Additional Contact Information</h2>
          <p>Email: kristian@matthews-kennington.com</p>
          <p>Phone: +44 7563 215490</p>
          <p>LinkedIn: linkedin.com/in/kristian-matthews-kennington</p>
        </Col>
      </Row>
    </Container>
  );
}