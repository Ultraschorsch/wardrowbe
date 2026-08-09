'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCreateOutfitFromPhoto } from '@/lib/hooks/use-studio';

export function PhotoOutfitButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  const mutation = useCreateOutfitFromPhoto();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const result = await mutation.mutateAsync({ photo: file, occasion: 'casual' });
      if (result.matched_item_count > 0) {
        toast.success(
          `Outfit logged with ${result.matched_item_count} matched item(s). Opening for review…`
        );
        router.push(`/dashboard/outfits/new?edit=${result.outfit.id}`);
      } else {
        toast.error('No items matched. Try a clearer, full-body photo.');
      }
    } catch {
      toast.error('Could not process this photo. Please try again.');
    } finally {
      setIsAnalyzing(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => inputRef.current?.click()}
        disabled={isAnalyzing}
      >
        <Camera className="mr-2 h-4 w-4" />
        {isAnalyzing ? 'Analyzing…' : 'Log Outfit from Photo'}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
