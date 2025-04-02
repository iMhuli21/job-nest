'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuPortal,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { $Enums } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';
import ResponsesDropdown from './responsesDropdown';
import { JsonValue } from '@prisma/client/runtime/library';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { changeStatusFn } from '@/actions/updateStatus';

interface Props {
  applicationId: string;
  cvUrl: string;
  answers: JsonValue[];
  status: $Enums.Status;
}

export default function ApplicantDropdown({
  answers,
  applicationId,
  cvUrl,
  status,
}: Props) {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<typeof status>(status);

  const handleChangeStatus = async (value: typeof status) => {
    setLoading(true);
    setSelectedStatus(value);

    const res = await changeStatusFn(applicationId, value);

    if (res?.error) {
      setLoading(false);
      return toast.error('Error', {
        description: res.error,
      });
    } else if (res?.success) {
      setLoading(false);
      toast.success('Success', {
        description: res.success,
      });

      route.refresh();
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className='w-6 h-6' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='font-[family-name:var(--font-nunito)]'>
        <DropdownMenuLabel>Manage Applicant</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='font-[family-name:var(--font-nunito)]'>
              <DropdownMenuCheckboxItem
                disabled={loading}
                checked={selectedStatus === 'applied'}
                onClick={() => handleChangeStatus('applied')}
              >
                Applicant
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                disabled={loading}
                checked={selectedStatus === 'shortlisted'}
                onClick={() => handleChangeStatus('shortlisted')}
              >
                Shortlisted
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                disabled={loading}
                checked={selectedStatus === 'rejected'}
                onClick={() => handleChangeStatus('rejected')}
              >
                Rejected
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem asChild>
          <a href={cvUrl} target='_blank' rel='noopener noreferrer'>
            View CV
          </a>
        </DropdownMenuItem>
        {answers.length > 0 && <ResponsesDropdown answers={answers} />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
