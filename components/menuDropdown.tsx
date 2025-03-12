import { auth, signOut } from '@/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { routes } from '@/lib/constants';
import Link from 'next/link';
import { CgMenuRight } from 'react-icons/cg';
import { Button } from './ui/button';
import SignOutBtn from './signOutBtn';

export default async function MenuDropdown() {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CgMenuRight className='text-2xl hover:cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='font-[family-name:var(--font-nunito)]'>
        <DropdownMenuLabel className='text-center'>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className='sm:hidden'>
          {routes.map((route) => (
            <DropdownMenuItem key={route.href}>
              <Link href={route.href}>{route.label}</Link>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuItem asChild>
          {session ? (
            <SignOutBtn />
          ) : (
            <Link href='/sign-in' className='h-9 px-4 py-2 w-full'>
              Sign In
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
