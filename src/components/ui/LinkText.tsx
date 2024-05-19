import { ReactNode } from "react";

type Props = {
  className?: string;
  url: string;
  children: ReactNode;
};

export function LinkText({ className, url, children }: Props) {
  return (
    <a className={`${className} text-blue-500 hover:underline`} href={url}>
      {children}
    </a>
  );
}
