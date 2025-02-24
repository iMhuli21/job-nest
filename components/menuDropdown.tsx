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

export default function MenuDropdown() {
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
        <DropdownMenuItem>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
