import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function Home() {
  return (
    <Card className="w-sm">
      <CardHeader className="h-full w-full p-0 text-center">
        <CardTitle className="text-xl font-bold">Verify Scholar</CardTitle>
        <CardDescription>
          A tool to verify a DOST SA USC scholar.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-justify">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
          sapiente numquam ullam modi. Accusamus cum labore dolorem perspiciatis
          culpa sequi!
        </p>
      </CardContent>
    </Card>
  );
}
