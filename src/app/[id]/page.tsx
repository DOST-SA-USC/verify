import React from 'react';

import { Card } from '@/components/ui/card';

import Invalid from './invalid';
import Valid from './valid';
import { UserType } from '@/type';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://tracker.dostsausc.org/api/scholar/${id}`, {
    headers: {
      authorization: `Bearer ${process.env.DSU_API_KEY}`,
    },
  });

  let data: UserType | null = null;
  if (res.ok) {
    data = await res.json();
  }

  return (
    <Card className="h-full w-sm gap-0 p-0 px-0 md:w-md">
      {res.ok && data ? (
        <Valid
          data={
            {
              uscID: data.uscID,
              firstName: data.firstName,
              middleName: data.middleName,
              lastName: data.lastName,
              image: data.image,
              program: data.program,
              yearLevel: data.yearLevel,
              yearOfAward: data.yearOfAward,
              scholarshipType: data.scholarshipType,
            } as UserType
          }
        />
      ) : (
        <Invalid id={id} />
      )}
    </Card>
  );
}
