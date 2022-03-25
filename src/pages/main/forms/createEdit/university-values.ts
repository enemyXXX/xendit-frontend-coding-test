import { UniversityModel } from '../../../../shared/models/universityModel';

export const initialUniversityValue: UniversityModel = {
  id: 0,
  created_at: new Date(),
  updated_at: new Date(),
  domains: [],
  web_pages: [],
  country: '',
  name: '',
  alpha_two_code: '',
  state_province: '',
};
