import { default as NextLink } from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href = '', children, ...rest },
  ref
) {
  switch (true) {
    case href.startsWith('/'):
      return (
        <NextLink href={href} ref={ref} {...rest}>
          {children}
        </NextLink>
      );
    case href.startsWith('#'):
      return (
        <a href={href} ref={ref} {...rest}>
          {children}
        </a>
      );
    default:
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          {...rest}
        >
          {children}
        </a>
      );
  }
});

export default Link;
