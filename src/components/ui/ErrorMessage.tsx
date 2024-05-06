export function ErrorMessage({
  className,
  message,
  hidden,
}: {
  className?: string;
  message: string;
  hidden: boolean;
}) {
  return (
    <p className={`text-sm text-red-500 ${className}`} hidden={hidden}>
      {message}
    </p>
  );
}
