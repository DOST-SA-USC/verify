import { ShieldX } from 'lucide-react';
import React from 'react';

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { LookupFailureReason } from '@/lib/scholar';

const INVALID_MESSAGE_BY_REASON: Record<
  LookupFailureReason,
  {
    title: string;
    description: string;
    detail: string;
    idLabel: string;
  }
> = {
  invalid_id: {
    title: 'Invalid Scholar ID',
    description: 'The provided ID format is not valid for verification.',
    detail:
      'Use only letters, numbers, hyphens, or underscores (max 64 characters).',
    idLabel: 'Submitted ID',
  },
  not_found: {
    title: 'Verification Failed',
    description:
      'We could not confirm this scholar record from the ID provided.',
    detail: 'The scholar ID either does not exist or is no longer active.',
    idLabel: 'No record found for ID',
  },
  service_unavailable: {
    title: 'Verification Unavailable',
    description:
      'The verification service is temporarily unavailable. Please try again shortly.',
    detail:
      'If this continues, contact DOST SA USC and report the ID shown below.',
    idLabel: 'Reference ID',
  },
};

const Invalid = (props: { id: string; reason: LookupFailureReason }) => {
  const message = INVALID_MESSAGE_BY_REASON[props.reason];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden p-6 md:p-8">
      <div className="from-primary/20 via-primary to-primary/20 absolute inset-x-0 top-0 h-1 bg-gradient-to-r" />

      <CardHeader className="relative items-center gap-2 p-0 text-center">
        <CardTitle className="text-2xl font-extrabold tracking-tight">
          {message.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-balance">
          {message.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative mt-5 flex flex-1 flex-col justify-center gap-5 px-0 py-0">
        <div className="flex items-center">
          <div className="bg-border h-px flex-1" />
          <div className="bg-destructive/10 text-destructive border-destructive/30 mx-3 flex size-8 items-center justify-center rounded-full border">
            <ShieldX className="size-4" />
          </div>
          <div className="bg-border h-px flex-1" />
        </div>

        <div className="border-destructive/30 bg-destructive/5 flex flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center">
          <p className="text-muted-foreground text-sm">{message.idLabel}</p>
          <p className="bg-background text-foreground inline-flex rounded-md border px-3 py-1.5 font-mono text-sm font-semibold">
            {props.id}
          </p>
          <p className="text-muted-foreground text-sm">{message.detail}</p>
        </div>
      </CardContent>
    </div>
  );
};

export default Invalid;
