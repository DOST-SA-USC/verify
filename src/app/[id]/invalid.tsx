import { ShieldX } from 'lucide-react';
import React from 'react';

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Invalid = (props: { id: string }) => {
  return (
    <div className="my-10 flex h-full min-h-40 w-full flex-col justify-between gap-2 p-4 px-8">
      <CardHeader className="h-full w-full p-0 text-center">
        <CardTitle className="text-xl font-bold">Verify Scholar</CardTitle>
        <CardDescription>
          A tool to verify a DOST SA USC scholar.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col items-center justify-center gap-2 p-0">
        <ShieldX className="text-destructive size-40" />
        <div className="text-center text-base">
          <p>
            Scholar with ID: <u>{props.id}</u>
          </p>
          <p className="text-sm">either does not exist or is invalid.</p>
        </div>
      </CardContent>
    </div>
  );
};

export default Invalid;
