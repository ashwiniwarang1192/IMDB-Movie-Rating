// eslint-disable-next-line import/prefer-default-export
export const prodEnv = 'production';
export const devEnv = 'development';
export const isDev = (process.env.NODE_ENV === 'development');
export const isProd = (process.env.NODE_ENV === 'production');
export const isStage = (process.env.NODE_ENV === 'staging');
export const credentialSecret = 'spectrumWordle';
export const mongoCredentialSecret = 'mongo_wordle';
export const serviceName = 'wordle';
export const postTemplateType = 'post';
export const pageTemplateType = 'page';
export const statusActive = 'active';
export const statusInactive = 'inactive';
export const blobVaultServiceName = 'mdirectoms';
export const blobVaultCredentialSecret = 'mdirectomsBlob';
export const eventTypeMapping = {
    'MMIP_CONTACT': "mdirectomni_contactUs",
    'MMIP_REGISTRATION': "mdirectomni_registration"
}