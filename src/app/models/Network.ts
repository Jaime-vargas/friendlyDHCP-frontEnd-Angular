export interface Network {
  id: number;
  name: string;
  subnet: string;
  netmask: string;
  start_range: string;
  end_range: string;
  default_lease_time: string;
  max_lease_time: string;
  router: string;
  primary_dns: string;
  secondary_dns: string;
  devices_count: number;
}
