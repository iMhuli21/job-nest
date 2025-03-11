'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PenLineIcon, Trash2, View } from 'lucide-react';
export default function JobDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className='w-5 h-5 flex-none' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='font-[family-name:var(--font-nunito)]'>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex items-center gap-2 w-full'>
          <PenLineIcon className='flex-none w-5 h-5' />
          <span>Edit Job</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='flex items-center gap-2 w-full'>
          <Trash2 className='flex-none w-5 h-5' />
          <span>Delete Job</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='flex items-center gap-2 w-full'
          onClick={() => window.location.assign('/job/1/applicants')}
        >
          <View className='flex-none w-5 h-5' />
          <span>View Job Applicants</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
