import { toast } from 'react-toastify';

export const removeToastWithDelay = (toastId: string, delay?: number) => {
  setTimeout(() => {
    toast.dismiss(toastId);
  }, delay || 750);
};
