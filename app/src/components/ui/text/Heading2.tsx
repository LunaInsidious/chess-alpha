import { HeadingProps } from "@/components/ui/text/Heading1";

export function Heading2({
  children,
  className = "text-black",
}: HeadingProps): JSX.Element {
  return <h2 className={`${className} text-h2`}>{children}</h2>;
}
