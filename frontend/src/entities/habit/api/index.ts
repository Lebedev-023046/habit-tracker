import { api as AxiosApiInstance } from '@/shared/api/instance';
import { HabitRepo } from './habitRepo';

export const habitRepo = new HabitRepo(AxiosApiInstance);
