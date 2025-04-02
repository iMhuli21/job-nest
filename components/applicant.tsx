import React from 'react';
import Image from 'next/image';
import { $Enums } from '@prisma/client';
import { Card, CardContent } from './ui/card';
import ApplicantDropdown from './applicantDropdown';
import { JsonValue } from '@prisma/client/runtime/library';

type Props = {
  data: {
    applicant: {
      contactNumber: string;
      fullName: string;
      email: string;
      jobTitle: string;
      avatarUrl: string;
      cvUrl: string | null;
    };
  } & {
    id: string;
    answers: JsonValue[];
    status: $Enums.Status;
  };
};

export default function Applicant({ data }: Props) {
  return (
    <Card>
      <CardContent className='w-[350px] font-[family-name:var(--font-nunito)] space-y-4'>
        <div className='flex items-start gap-4 justify-between w-full'>
          <div className='flex items-center gap-4'>
            <Image
              src={data.applicant.avatarUrl}
              width={80}
              height={80}
              alt='avatar'
              className='w-[60px] h-[60px] object-cover object-center rounded-full'
              priority
            />
            <div className='flex flex-col items-start gap-0'>
              <h4 className='font-semibold'>{data.applicant.fullName}</h4>
              <span className='text-sm opacity-60 font-medium'>
                {data.applicant.jobTitle}
              </span>
            </div>
          </div>
          <ApplicantDropdown
            applicationId={data.id}
            cvUrl={data.applicant.cvUrl!}
            status={data.status}
            answers={data.answers}
          />
        </div>
        <div className='flex flex-col items-start gap-2 w-full'>
          <div className='flex items-center gap-4 justify-between w-full'>
            <span className='opacity-40 text-sm'>Contact Number</span>
            <p className='opacity-70 text-sm'>{data.applicant.contactNumber}</p>
          </div>
          <div className='flex items-center gap-4 justify-between w-full'>
            <span className='opacity-40 text-sm'>Email</span>
            <p className='opacity-70 text-sm'>{data.applicant.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
