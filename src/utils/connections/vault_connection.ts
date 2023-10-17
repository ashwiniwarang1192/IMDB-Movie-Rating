import { execSync } from 'child_process';
import { isProd } from '../../modules/common/constants';

const fetchVaultConnection = (serviceName : string, credentialSecret: string) => {
  if (isProd) {
    const stdout = execSync(`/usr/local/bin/keycli_linux_amd64 -service_name '${serviceName}' -credential_name '${credentialSecret}'`);
    const output = stdout.toString('utf8').replace('\n', '');
    return JSON.parse(output);
  }
  return {
    credential_secret: `${serviceName}_${credentialSecret}`,
  };
};
export default fetchVaultConnection;
