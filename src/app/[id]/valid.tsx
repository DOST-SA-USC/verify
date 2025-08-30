import { Award, BadgeCheck, Calendar } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { getInitials, formatFullName } from '@/lib/helpers';

import type { UserType } from '@/type';

const Valid = (props: { data: UserType }) => {
  return (
    <CardContent className="flex h-full w-full flex-col items-start p-2">
      <Image
        src="/banner.jpeg"
        alt="Banner"
        width={600}
        height={200}
        className="w-full rounded-lg"
      />
      <div className="-mt-16 flex h-full w-full flex-col justify-between gap-2 px-6">
        <Avatar className="border-background size-32 border-8">
          <AvatarImage src={props.data.image} alt="Profile Picture" />
          <AvatarFallback>
            {getInitials(`${props.data.firstName} ${props.data.lastName}`)}
          </AvatarFallback>
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold">
              {formatFullName(
                props.data.firstName,
                props.data.middleName,
                props.data.lastName,
                props.data.suffix
              )}
            </h1>

            <Tooltip>
              <TooltipTrigger>
                <BadgeCheck className="text-secondary size-4" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Verified</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-x-2">
            <span className="text-muted-foreground">{props.data.uscID}</span>
            {props.data.scholarshipType && props.data.yearOfAward && (
              <>
                <span className="text-muted-foreground inline-block align-middle text-lg font-bold">
                  •
                </span>
                <Badge variant="outline">
                  <Award />
                  {props.data.scholarshipType}
                </Badge>
                <Badge variant="outline">
                  <Calendar />
                  {props.data.yearOfAward}
                </Badge>
              </>
            )}
          </div>
        </div>

        <h2 className="bg-primary text-primary-foreground mt-4 flex h-10 w-full items-center justify-center rounded-lg font-extrabold">
          {props.data.program && props.data.yearLevel
            ? `${props.data.program} - ${props.data.yearLevel}`
            : 'DOST SA USC STAFF'}
        </h2>
        <p className="text-muted-foreground mb-4 text-center text-xs">
          Ensure the address starts with <u>verify.dostsausc.org</u> — otherwise
          it&apos;s fraudulent.
        </p>
      </div>
    </CardContent>
  );
};

export default Valid;
