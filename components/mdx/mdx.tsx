import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

const customComponents: MDXComponents = {
    img: ({ src, alt }) => (
        <Image
            src={src as string}
            alt={alt as string}
            width={800}
            height={600}
            className='w-full rounded-lg border border-gray-300 shadow'
        />
    ),
};

export default customComponents;
