'use client';

import { useMemo, useState } from 'react';
import {
  Button,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Figure,
  FigureCaption,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap';
import QRCode from 'react-qr-code';
import QrCard from './QrCard';

export default function QrGenerator() {
  const [type, setType] = useState('Text');
  const [inputTextValue, setInputTextValue] = useState<string>('');
  const [inputUrlValue, setInputUrlValue] = useState<string>('');
  const [inputSsidValue, setInputSsidValue] = useState<string>('');
  const [inputPasswordValue, setInputPasswordValue] = useState<string>('');

  const value = useMemo(() => {
    switch (type) {
      case 'Text':
        return inputTextValue.trim();
      case 'URL':
        return inputUrlValue.trim();
      case 'Wi-Fi':
        return `WIFI:S:${inputSsidValue.trim()};T:WPA;P:${inputPasswordValue.trim()};;`;
      default:
        return '';
    }
  }, [type, inputTextValue, inputUrlValue, inputSsidValue, inputPasswordValue]);

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    colorMode: 'light' | 'dark' = 'light'
  ) => {
    const svg = document.querySelector(`.bg-${colorMode} > svg`);
    const svgData = new XMLSerializer().serializeToString(svg!);
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      canvasContext!.drawImage(image, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR - ${type} - ${value} - ${colorMode}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    image.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Row className="mb-5">
      <Col md={6} className="text-center mb-3">
        <Form>
          {[
            'Text',
            'URL',
            // 'Email',
            // 'Phone',
            // 'SMS',
            'Wi-Fi',
          ].map((thisType) => (
            <Button
              key={thisType}
              variant={`${type === thisType ? 'primary' : 'secondary'}`}
              className={`mb-2 ms-2 ${type === thisType ? 'active' : ''}`}
              onClick={() => setType(thisType)}
            >
              {thisType}
            </Button>
          ))}
          {(() => {
            switch (type) {
              case 'Text':
                return (
                  <FormGroup>
                    <FloatingLabel label="Text">
                      <FormControl
                        type="text"
                        value={inputTextValue}
                        onChange={(event) =>
                          setInputTextValue(event.target.value)
                        }
                        placeholder="Enter text"
                      />
                    </FloatingLabel>
                  </FormGroup>
                );
              case 'URL':
                return (
                  <FormGroup>
                    <FloatingLabel label="URL">
                      <FormControl
                        type="url"
                        value={inputUrlValue}
                        onChange={(event) =>
                          setInputUrlValue(event.target.value)
                        }
                        placeholder="Enter URL"
                      />
                    </FloatingLabel>
                  </FormGroup>
                );
              case 'Wi-Fi':
                return (
                  <>
                    <FormGroup>
                      <FloatingLabel label="SSID">
                        <FormControl
                          type="text"
                          value={inputSsidValue}
                          onChange={(event) =>
                            setInputSsidValue(event.target.value)
                          }
                          placeholder="Enter SSID"
                        />
                      </FloatingLabel>
                    </FormGroup>
                    <FormGroup>
                      <FloatingLabel label="Password">
                        <FormControl
                          type="password"
                          value={inputPasswordValue}
                          onChange={(event) =>
                            setInputPasswordValue(event.target.value)
                          }
                          placeholder="Enter password"
                        />
                      </FloatingLabel>
                    </FormGroup>
                  </>
                );
              default:
                return null;
            }
          })()}
        </Form>
      </Col>
      <Col md={6} className="mb-3">
        <Row>
          <Col xs={6} className="text-center mb-3">
            <Figure>
              <QrCard value={value} theme="light">
                {(() => {
                  switch (type) {
                    case 'Text':
                      return <CardBody>{inputTextValue}</CardBody>;
                    case 'URL':
                      return <CardBody>{inputUrlValue}</CardBody>;
                    case 'Wi-Fi':
                      return (
                        <>
                          <CardBody>
                            <CardTitle>{inputSsidValue}</CardTitle>
                            <CardText>{inputPasswordValue}</CardText>
                          </CardBody>
                        </>
                      );
                    default:
                      return null;
                  }
                })()}
              </QrCard>
              <FigureCaption className="mt-3">Light</FigureCaption>
            </Figure>
            <Button
              onClick={(event) => {
                handleButtonClick(event, 'light');
              }}
            >
              Download
            </Button>
          </Col>
          <Col xs={6} className="text-center mb-3">
            <Figure>
              <QrCard value={value} theme="dark">
                {(() => {
                  switch (type) {
                    case 'Text':
                      return <CardBody>{inputTextValue}</CardBody>;
                    case 'URL':
                      return <CardBody>{inputUrlValue}</CardBody>;
                    case 'Wi-Fi':
                      return (
                        <>
                          <CardBody>
                            <CardTitle>{inputSsidValue}</CardTitle>
                            <CardText>{inputPasswordValue}</CardText>
                          </CardBody>
                        </>
                      );
                    default:
                      return null;
                  }
                })()}
              </QrCard>
              <FigureCaption className="mt-3">Dark</FigureCaption>
            </Figure>
            <Button
              onClick={(event) => {
                handleButtonClick(event, 'dark');
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
