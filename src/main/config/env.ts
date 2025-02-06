export const envConfig = {
  PORT: process.env.PORT ?? 3000,
  TZ: 'America/Sao_Paulo',
  AUTH_USER: process.env.AUTH_USER ?? '',
  AUTH_PWD: process.env.AUTH_PWD ?? '',
  BODY_PARSER_JSON_LIMIT: '50mb',
  IS_ACTIVE_DB_DEBUG: process.env.IS_ACTIVE_DB_DEBUG === 'true',
  VIDEO_PROCESSOR_QUEUE_URL: process.env.VIDEO_PROCESSOR_QUEUE_URL ?? '',
  CLOUD_ACCESS_KEY: process.env.CLOUD_ACCESS_KEY ?? '',
  CLOUD_SECRET_KEY: process.env.CLOUD_SECRET_KEY ?? '',
  CLOUD_STORAGE_BUCKET: process.env.CLOUD_STORAGE_BUCKET,
  CLOUD_REGION: process.env.CLOUD_REGION ?? '',
}
