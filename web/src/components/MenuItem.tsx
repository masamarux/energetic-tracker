import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HTMLAttributes } from 'react';

interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  href: string;
}

export function MenuItem({ children, href, ...rest }: MenuItemProps) {
  const {pathname} = useRouter()
  return (
    <li 
      className={clsx('rounded-md py-2 px-4 hover:bg-dark-blue-300 transition-colors duration-200 text-gray-200 hover:text-gray-100', {
        'bg-dark-blue-500 ': href === pathname,
      })}
      {...rest}
    >
      <Link
        prefetch={false}
        href={href}
        className='flex items-center flex-row gap-4'
      >{children}</Link>
    </li>
  )
}