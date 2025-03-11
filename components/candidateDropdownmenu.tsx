'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export default function CandidateDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex-none'>
        <MoreHorizontal className='w-5 h-5 opacity-50' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='font-[family-name:var(--font-nunito)]'>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change Job Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem checked>Applied</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Shortlisted</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Rejected</DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
