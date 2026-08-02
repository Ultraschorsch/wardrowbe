'use client';

import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateOutfitFromPhoto } from '@/lib/hooks/use-studio';

export function PhotoOutfitButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const mutation = useCreateOutfitFromPhoto();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('Analyzing photo…');
    try {
      const result = await mutation.mutateAsync({ photo: file, occasion: 'casual' });
      setStatus(
        result.matched_item_count > 0
          ? `Outfit logged with ${result.matched_item_count} matched item(s).`
          : 'No items matched. Try a clearer, full-body photo.'
      );
    } catch {
      setStatus('Could not process this photo. Please try again.');
    } finally {
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1">
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => inputRef.current?.click()}
        disabled={mutation.isPending}
      >
        <Camera className="mr-2 h-4 w-4" />
        {mutation.isPending ? 'Analyzing…' : 'Log Outfit from Photo'}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {status && <p className="px-1 text-xs text-muted-foreground">{status}</p>}
    </div>
  );
}
