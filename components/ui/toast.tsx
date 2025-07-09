import { toast } from 'sonner';

export const notify = (message: string, type: 'success' | 'error') => {
  if (type === 'success') toast.success(message);
  else if (type === 'error') toast.error(message);
};
