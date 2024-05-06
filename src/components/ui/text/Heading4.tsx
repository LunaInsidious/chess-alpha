import { HeadingProps } from "@/components/ui/text/Heading1";

export function Heading4({
  children,
  className = "text-black",
}: HeadingProps): JSX.Element {
  return <h4 className={`${className} text-h4`}>{children}</h4>;
}
