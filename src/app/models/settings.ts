
export interface Settings{
  sshIpAddress: string;
  sshPort: number;
  sshUser: string;
  sshPassword: string;
  routeToCopyConfigFile: string;
  commandToMoveConfigFile: string;
  commandToRestartService: string;
}
