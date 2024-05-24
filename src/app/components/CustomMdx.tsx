import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@mdx-js/react/lib';
import React, {
  AnchorHTMLAttributes,
  Component,
  ComponentType,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from 'react';
import Link from 'next/link';

function CustomLink(
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
): ReactNode {
  let { href } = props;

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      );
    }

    if (href.startsWith('#')) {
      return <a {...props} />;
    }
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function slugify(str: any) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function createHeading(
  level: number
): ComponentType<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> {
  const Heading: ComponentType<
    DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  > = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
};

export default function CustomMdx(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
