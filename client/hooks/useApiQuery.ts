import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';

export function useApiQuery<T>(
  key: string[],
  fetcher: () => Promise<T>,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: fetcher,
    ...options,
    onError: (err: any) => {
      toast.error(err?.message || 'An error occurred');
      options?.onError?.(err);
    },
    onSuccess: (data) => {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        toast.info('No data found');
      }
      options?.onSuccess?.(data);
    },
  });
} 