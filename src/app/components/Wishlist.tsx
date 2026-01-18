import React from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardLink,
  CardTitle,
  Col,
  Row,
} from 'react-bootstrap';
import { WishlistItem } from '../wishlist/utils';

interface WishlistProps {
  wishlist: WishlistItem[];
}

export default function Wishlist(props: WishlistProps) {
  return (
    <Row>
      {props.wishlist.map((item, index) => (
        <Col md={4} key={item.url} className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              <CardLink href={item.url} target="_blank">
                View
              </CardLink>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
