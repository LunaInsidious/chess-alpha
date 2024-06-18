import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant =
  | "primary"
  | "primaryOutlined"
  | "secondary"
  | "secondaryOutlined"
  | "red"
  | "redOutlined"
  | "textOnly"
  | "default";

export type Props = {
  block?: boolean;
  children: ReactNode;
  className?: string;
  to: string;
  variant: Variant;
};

export function ButtonToLink({
  block = false,
  children,
  className = "",
  to,
  variant,
}: Props): JSX.Element {
  const Variants: { [key in Variant]: string } = {
    primary: "text-white bg-primary hover:opacity-90",
    primaryOutlined: "text-primary border-primary border",
    secondary: "text-primary bg-gray-200 border-gray-200 border",
    secondaryOutlined: "text-primary border-gray-200 border",
    red: "text-red font-semibold",
    redOutlined: "text-red border-red border font-semibold",
    textOnly: "font-semibold",
    default: "hover:bg-gray-200",
  };

  return (
    <Link
      to={to}
      className={`flex items-center justify-center outline-none
      ${block ? "block w-full" : ""}
      ${Variants[variant]}
      ${className}
      `}
    >
      {children}
    </Link>
  );
}
