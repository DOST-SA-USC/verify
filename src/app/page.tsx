import { IdCardLanyard } from 'lucide-react';
import React from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function Home() {
  return (
    <Card className="w-sm">
      <CardHeader className="text-center">
        <div className="mb-2 flex justify-center">
          <IdCardLanyard className="text-primary size-40" />
        </div>
        <CardTitle className="text-2xl font-bold">
          Verify - DOST SA USC
        </CardTitle>
        <CardDescription>
          Instantly check scholar status & benefits eligibility.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
