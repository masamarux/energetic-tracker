import { syncConsumption } from '../models/Consumption.model';
import { syncUser } from '../models/User.model';

export async function syncAllModels() {
  await syncUser()
  await syncConsumption()
}