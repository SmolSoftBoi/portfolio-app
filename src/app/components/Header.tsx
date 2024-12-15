'use client';

import { usePathname } from 'next/navigation';
import { Nav, Container } from 'react-bootstrap';

import profilePic from '@/public/profile-picture.jpg';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="profile-header">
      <Container className="p-4" fluid>
        <div className="container-inner">
          <Image
            className="media-object rounded-circle"
            src={profilePic}
            alt="Kristian Matthews-Kennington"
            priority
          />
          <h1 className="profile-header-user">Kristian Matthews-Kennington</h1>
          <p className="profile-header-bio">
            Ambitious software developer and process improvement specialist with
            a passion for creating impactful digital experiences. I bring a
            diverse skill set in full-stack development, data analysis, and
            operational efficiency. Proven track record in enhancing customer
            service, driving business growth, and leveraging technology to solve
            complex problems.
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
            <Nav.Link href="/about" active={pathname.startsWith('/about')}>
              About Me
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/portfolio"
              active={pathname.startsWith('/portfolio')}
            >
              Portfolio
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </header>
  );
}
