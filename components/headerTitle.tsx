interface Props {
  title: string;
  subtitle: string;
}

export default function HeaderTitle({ subtitle, title }: Props) {
  return (
    <div className='flex flex-col items-center justify-center gap-1'>
      <h2 className='font-[family-name:var(--font-bebas_neue)] text-2xl text-center'>
        {title}
      </h2>
      <span className='opacity-60'>{subtitle}</span>
    </div>
  );
}
