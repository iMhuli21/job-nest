interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  return <div>view job {JSON.stringify(id)}</div>;
}
