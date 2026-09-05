import { useEffect, useState } from 'react';
import { CHUSEOK_OPEN_AT } from '../constants/chuseok';

export function useChuseokPeriod(isDevChuseokDay = false) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateIsOpen = () => {
      setIsOpen(isDevChuseokDay || Date.now() >= CHUSEOK_OPEN_AT);
    };

    updateIsOpen();
    const interval = setInterval(updateIsOpen, 1000);

    return () => clearInterval(interval);
  }, [isDevChuseokDay]);

  return isOpen;
}
