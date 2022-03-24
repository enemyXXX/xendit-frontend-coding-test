import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../global/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
