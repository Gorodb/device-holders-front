import { useRouter } from 'next/router';
import Link from 'next/link';
import {NavLinkProps} from "./navLink.props";

export const NavLink = ({ href, exact = false, children, className, ...props }: NavLinkProps): JSX.Element => {
  const { pathname } = useRouter();

  if (pathname === href) {
    className += ' active';
  }

  return (
    <Link href={href} {...props}>
      <a className={className}>
        {children}
      </a>
    </Link>
  );
}
