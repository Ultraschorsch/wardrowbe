'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCreateOutfitFromPhoto } from '@/lib/hooks/use-studio';
import { ACCEPTED_IMAGE_INPUT } from '@/lib/image-types';

export function PhotoOutfitButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  const t = useTranslations('dashboard.quickActions.photoOutfit');
  const mutation = useCreateOutfitFromPhoto();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const result = await mutation.mutateAsync({ photo: file, occasion: 'casual' });
      if (result.matched_item_count > 0) {
        toast.success(t('found', { count: result.matched_item_count }));
        router.push(`/dashboard/outfits/new?edit=${result.outfit.id}`);
      } else {
        toast.error(t('noMatch'));
      }
    } catch {
      toast.error(t('failed'));
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
        {isAnalyzing ? t('analyzing') : t('button')}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_INPUT}
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
