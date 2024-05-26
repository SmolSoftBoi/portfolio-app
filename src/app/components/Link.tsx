import { default as NextLink } from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export default function Link({ href = '', children, ...rest }: LinkProps) {
  let linkElement;

  switch (true) {
    case href.startsWith('/'):
      linkElement = (
        <NextLink href={href} {...rest}>
          {children}
        </NextLink>
      );
      break;
    case href.startsWith('#'):
      linkElement = (
        <a href={href} {...rest}>
          {children}
        </a>
      );
      break;
    default:
      linkElement = (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
  }

  return linkElement;
}
