/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable import/prefer-default-export */
import { execSync } from 'child_process';

const customGlobal: any = global;

export class Vault {
  private static getAuthKeyFromVault(serviceName: string, credentialName: string) {
    if (process.env.NODE_ENV === 'production') {
      const stdout = execSync(`/usr/local/bin/keycli_linux_amd64 -service_name '${serviceName}' -credential_name '${credentialName}'`);
      const output = stdout.toString('utf8').replace('\n', '');
      return JSON.parse(output);
    }
    return {
      credential_secret: `${serviceName}_${credentialName}`,
    };
  }

  static getAuthKey(serviceName: string, credentialName: string) {
    return customGlobal.vault[`${serviceName}`][`${credentialName}`]
      || Vault.setGlobalVault(serviceName, credentialName);
  }

  static setGlobalVault(serviceName: string, credentialName: string) {
    customGlobal.vault[`${serviceName}`][`${credentialName}`] = Vault.getAuthKeyFromVault(serviceName, credentialName);
  }
}
