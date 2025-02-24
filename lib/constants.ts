import { Briefcase, GraduationCap, Globe, Paintbrush } from 'lucide-react';

type Routes = {
  label: string;
  href: string;
};

export const routes: Routes[] = [
  {
    href: '/applications',
    label: 'Applications',
  },
  {
    href: '/jobs',
    label: 'Jobs',
  },
  {
    href: '/profile',
    label: 'Profile',
  },
];

export const stats = [
  '80% of job seekers find their next role online - start your search with JobNest today!',
  'Over 70% of employers say a streamlined hiring process improves candidate quality - JobNest makes hiring seamless!',
  'Save time with smart filters - search jobs by industry, location, and experience level.',
  '90% of job seekers prefer applying online - apply with ease on JobNest!',
  'Companies that post on job boards fill positions 50% faster - find top talent today!',
  'Your next opportunity is just a click away - discover new career paths on JobNest.',
  'JobNest connects job seekers with employers in real-time - no waiting, just opportunities!',
  'Hiring made simple - post jobs, track applications, and connect with candidates effortlessly.',
  'More jobs, more choices - thousands of opportunities updated daily!',
  'JobNest helps you stand out - create a profile and showcase your skills to top employers.',
];

export const audienceData = [
  {
    name: 'jobSeekers',
    title: '🎯 Job Seekers',
    description: 'Find the perfect job that matches your skills and passion.',
    icon: GraduationCap,
  },
  {
    name: 'employers&recruiters',
    title: '🏢 Employers & Recruiters',
    description: 'Post jobs and hire top talent effortlessly.',
    icon: Briefcase,
  },
  {
    name: 'freelancers',
    title: '🎨 Freelancers',
    description: 'Browse gigs and short-term projects.',
    icon: Paintbrush,
  },
  {
    name: 'remoteWorkers',
    title: '💻 Remote Workers',
    description: 'Discover flexible work opportunities from anywhere.',
    icon: Globe,
  },
];
