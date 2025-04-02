'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { MoreHorizontal, PenLineIcon, Trash2, View } from 'lucide-react';
import DeleteDialog from './deleteDialog';

export default function JobDropdownMenu({ jobId }: { jobId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className='w-5 h-5 flex-none' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='font-[family-name:var(--font-nunito)]'>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            className='flex items-center gap-2 w-full'
            href={`/job/${jobId}/edit`}
          >
            <PenLineIcon className='flex-none w-5 h-5' />
            <span>Edit Job</span>
          </Link>
        </DropdownMenuItem>
        <DeleteDialog id={jobId} />
        <DropdownMenuItem asChild>
          <Link
            className='flex items-center gap-2 w-full'
            href={`/job/${jobId}`}
          >
            <View className='flex-none w-5 h-5' />
            <span>View Job</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className='flex items-center gap-2 w-full'
            href={`/job/${jobId}/applicants`}
          >
            <View className='flex-none w-5 h-5' />
            <span>View Job Applicants</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
