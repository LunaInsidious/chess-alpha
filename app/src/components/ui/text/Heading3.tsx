import { HeadingProps } from "@/components/ui/text/Heading1";

export function Heading3({
  children,
  className = "text-black",
}: HeadingProps): JSX.Element {
  return <h3 className={`${className} text-h3`}>{children}</h3>;
}
