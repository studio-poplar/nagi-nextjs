import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "on-dark" | "on-sand" | "outline";

const variantClass: Record<Variant, string> = {
  primary: "btn primary",
  "on-dark": "btn on-dark",
  "on-sand": "btn on-sand",
  outline: "btn",
};

interface CommonProps {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button({
  variant = "outline",
  arrow = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${variantClass[variant]}${className ? ` ${className}` : ""}`;
  const content = (
    <>
      {children}
      {arrow && <span className="arrow">→</span>}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
