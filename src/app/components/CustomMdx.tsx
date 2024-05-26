'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import React from 'react';
import { components } from './mdx';

export default function CustomMdx(props: MDXRemoteProps) {
  return (
    <MDXRemote
      source={props.source}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        parseFrontmatter: true,
      }}
    />
  );
}
