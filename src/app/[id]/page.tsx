import { ShieldCheck } from 'lucide-react';
import React from 'react';

import IDComponent from '@/components/id-component';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Card className="w-auto">
      <CardHeader>
        <CardTitle>Scholar Verification</CardTitle>
        <CardDescription>
          This webpage verifies the scholarship details of the selected student.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col-reverse items-center justify-center gap-4 2xl:flex-col">
        <IDComponent
          user={{
            uscID: '12345678',
            firstName: 'John',
            middleName: 'Doe',
            lastName: 'Smith',
            image:
              'https://cnfbjdozpfkqlxtqoudy.supabase.co/storage/v1/object/public/users/emman',
            program: 'BS Information Technology',
            yearLevel: '1',
            birthDate: '01-01-2000',
            yearOfAward: '2024',
            scholarshipType: 'academic',
            emergencyContact: 'Jane Smith',
            emergencyContactNumber: '09987654321',
          }}
        />
        <div className="flex w-full items-center justify-center gap-2">
          <h1>Scholarship Status:</h1>
          <Badge variant="default">
            <ShieldCheck />
            Active
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
