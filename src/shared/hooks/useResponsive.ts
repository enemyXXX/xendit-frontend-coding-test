import { useMediaQuery } from 'react-responsive';
import breakpoints from '../../global/constants/breakpoints';

export const useResponsive = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.mobile}px)`,
  });

  const isTablet = useMediaQuery({
    query: `(max-width: ${breakpoints.tablet}px)`,
  });

  return { isMobile, isTablet };
};
