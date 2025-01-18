'use client';

import React from 'react';
import {
  Col,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap';
import QRCode from 'react-qr-code';

const DEFAULT_QR_VALUE = 'https://kristian.matthews-kennington.com';

export default function QrGenerator() {
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Row className="mb-5">
      <Col>
        <Form>
          <FormGroup>
            <FloatingLabel label="Text or URL">
              <FormControl
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter text or URL"
              />
            </FloatingLabel>
          </FormGroup>
        </Form>
      </Col>
      <Col>
        <div>
          <div className="d-inline-block img-thumbnail">
            <QRCode key={inputValue} value={inputValue.trim() || DEFAULT_QR_VALUE} />
          </div>
        </div>
      </Col>
    </Row>
  );
}
