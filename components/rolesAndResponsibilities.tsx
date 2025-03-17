'use client';

import Dompurify from 'dompurify';

interface Props {
  content: string;
  className?: string;
}

export default function RolesAndResponsibilities({
  content,
  className,
}: Props) {
  const sanitizedContent = Dompurify.sanitize(content);
  return (
    <div
      className={`${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
