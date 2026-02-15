import { ShieldCheck } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function Home() {
  return (
    <Card className="relative min-h-80 w-[min(92vw,34rem)] overflow-hidden">
      <div className="from-primary/20 via-primary to-primary/20 absolute inset-x-0 top-0 h-1 bg-gradient-to-r" />

      <CardHeader className="items-center gap-4 pt-8 text-center">
        <div className="space-y-2">
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            Verify DOST SA USC Scholar
          </CardTitle>
          <CardDescription className="mx-auto max-w-md text-sm text-balance">
            Confirm scholar identity and benefits eligibility in seconds.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-0">
        <div className="flex items-center">
          <div className="bg-border h-px flex-1" />
          <div className="bg-primary/10 text-primary mx-3 flex size-8 items-center justify-center rounded-full border border-primary/30">
            <ShieldCheck className="size-4" />
          </div>
          <div className="bg-border h-px flex-1" />
        </div>
      </CardContent>

      <CardFooter className="px-6 pt-1 pb-6">
        <p className="text-muted-foreground w-full text-center text-xs">
          Only trust verification pages under{' '}
          <span className="font-semibold">verify.dostsausc.org</span>.
        </p>
      </CardFooter>
    </Card>
  );
}
