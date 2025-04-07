'use client';

import { Button } from '@/components/ui/button';
import { $Enums } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

export type Data = {
  id: string;
  createdAt: Date;
  status: $Enums.Status;
  job: {
    company: string;
    closeDate: Date;
    title: string;
    id: string;
  };
};

export const columns: ColumnDef<Data>[] = [
  {
    id: 'job.title',
    accessorKey: 'job.title',
    header: 'Job',
  },
  {
    accessorKey: 'job.company',
    header: 'Company',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date Applied
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell({ row }) {
      return (
        <p>{format(parseISO(row.getValue('createdAt')), 'dd MMMM yyyy')}</p>
      );
    },
  },
  {
    id: 'job.closeDate',
    accessorKey: 'job.closeDate',
    header: 'Close Date',
    cell({ row }) {
      return (
        <p>{format(parseISO(row.getValue('job.closeDate')), 'dd MMMM yyyy')}</p>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell({ row }) {
      return <p className='capitalize'>{row.getValue('status')}</p>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='font-[family-name:var(--font-nunito)]'
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/job/${data.job.id}`}>View Job</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
