'use client';

import { useRouter } from 'next/router';
import { Navbar, Nav, Container } from 'react-bootstrap';

import profilePic from '@/public/profile-picture.jpg';
import profileHeader from '@/public/profile-header.jpg';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <header
      className="profile-header"
      style={{
        backgroundImage: `url(${profileHeader.src})`,
      }}
    >
      <Container className="p-4" fluid>
        <div className="container-inner">
          <Image
            className="media-object rounded-circle"
            src={profilePic}
            alt="Kristian Matthews-Kennington"
          />
          <h1 className="profile-header-user">Kristian Matthews-Kennington</h1>
          <p className="profile-header-bio">
            Ambitious software developer with a focus on web design and
            full-stack development.
          </p>
        </div>
      </Container>
      <div className="profile-header-nav">
        <Nav className="justify-content-center sticky-top" variant="tabs">
          <Nav.Item>
            <Nav.Link href="/" active={pathname === '/'}>
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/about" active={pathname === '/about'}>
              About Me
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/portfolio" active={pathname === '/portfolio'}>
              Portfolio
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </header>
  );
}
