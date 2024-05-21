import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { ComponentProps } from 'react';
import { MDXProvider } from '@mdx-js/react';

let components: ComponentProps<typeof MDXProvider>['components'] = {};

export default function CustomMdx(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
