//@ts-nocheck
import { useRouter } from "next/router";

import Link, { LinkProps } from "next/link";
import React, { Children } from "react";

interface ActiveLinkProps extends React.PropsWithChildren<LinkProps> {
  activeClassName: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  activeClassName,
  ...props
}) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link href={props.href} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
