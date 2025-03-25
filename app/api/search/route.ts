import { maxItems } from '@/lib/constants';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const query = decodeURIComponent(url.searchParams.get('query') as string);

    const page = Number(url.searchParams.get('page')) || 1;

    const industry = decodeURIComponent(
      url.searchParams.get('industry') as string
    );

    if (query && industry) {
      const res = await prisma.job.findMany({
        where: {
          title: {
            contains: query,
            mode: 'insensitive',
          },
          industry: {
            equals: industry,
          },
        },
        skip: (page - 1) * maxItems,
        take: maxItems,
      });

      if (!res) {
        return NextResponse.json(
          {
            error: 'Something went wrong.',
          },
          {
            status: 400,
          }
        );
      }

      const numOfJobs = await prisma.job.count({
        where: {
          title: {
            contains: query,
            mode: 'insensitive',
          },
          industry: {
            equals: industry,
          },
        },
      });

      const numPages = Math.ceil(numOfJobs / maxItems);

      return NextResponse.json(
        {
          jobs: res,
          numPages,
        },
        { status: 200 }
      );
    } else if (query) {
      const res = await prisma.job.findMany({
        where: {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * maxItems,
        take: maxItems,
      });

      if (!res) {
        return NextResponse.json(
          {
            error: 'Something went wrong.',
          },
          {
            status: 400,
          }
        );
      }

      const numOfJobs = await prisma.job.count({
        where: {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
      });

      const numPages = Math.ceil(numOfJobs / maxItems);

      return NextResponse.json(
        {
          jobs: res,
          numPages,
        },
        { status: 200 }
      );
    } else if (industry) {
      const res = await prisma.job.findMany({
        where: {
          industry: {
            equals: industry,
          },
        },
        skip: (page - 1) * maxItems,
        take: maxItems,
      });

      if (!res) {
        return NextResponse.json(
          {
            error: 'Something went wrong.',
          },
          {
            status: 400,
          }
        );
      }

      const numOfJobs = await prisma.job.count({
        where: {
          industry: {
            equals: industry,
          },
        },
      });

      const numPages = Math.ceil(numOfJobs / maxItems);

      return NextResponse.json(
        {
          jobs: res,
          numPages,
        },
        { status: 200 }
      );
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        {
          error: e.message,
        },
        { status: 400 }
      );
    }
  }
}
