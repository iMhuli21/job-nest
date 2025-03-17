interface Props {
  message: string;
}

export default function NotFound({ message }: Props) {
  return (
    <div className='flex items-center justify-center min-h-dvh w-full text-lg font-medium p-2 font-[family-name:var(--font-nunito)]'>
      {message}
    </div>
  );
}
