import { PropsWithChildren } from 'react';
import { Card, CardBody, CardImg } from 'react-bootstrap';
import QRCode, { QRCodeProps } from 'react-qr-code';

export interface QrCardProps extends PropsWithChildren, QRCodeProps {
  theme?: 'light' | 'dark' | string;
}

export default function QrCard(props: QrCardProps) {
  const bgColor = props.bgColor || 'transparent';
  let fgColor = props.fgColor;
  if (!fgColor && props.theme) {
    switch (props.theme) {
      case 'light':
        fgColor = 'var(--bs-dark)';
        break;
      case 'dark':
        fgColor = 'var(--bs-light)';
        break;
    }
  }

  return (
    <Card
      className="text-center"
      bg={props.theme}
      text={props.theme === 'light' ? 'dark' : 'light'}
    >
      <QRCode
        value={props.value}
        bgColor={bgColor}
        fgColor={fgColor}
        className={`card-img-top img-fluid ${!props.children && 'card-img-bottom'}`}
      />
      {props.children}
    </Card>
  );
}
