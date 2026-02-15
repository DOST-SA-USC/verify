import { Card } from '@/components/ui/card';
import { fetchScholarById } from '@/lib/scholar';

import Invalid from './invalid';
import Valid from './valid';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await fetchScholarById(id);

  return (
    <Card className="h-full w-sm gap-0 p-0 px-0 md:w-md">
      {result.kind === 'success' ? (
        <Valid data={result.data} />
      ) : (
        <Invalid id={result.displayId} reason={result.reason} />
      )}
    </Card>
  );
}
