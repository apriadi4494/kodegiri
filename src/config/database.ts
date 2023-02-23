export default (configService) => ({
  dialect: configService.get('DB_TYPE'),
  host: configService.get('DB_HOST', 'localhost'),
  port: parseInt(configService.get('DB_PORT', 5432)),
  username: configService.get('DB_USER', 'postgres'),
  password: configService.get('DB_PASSWORD', 'postgres'),
  database: configService.get('DB_NAME', 'test'),
  entities: [__dirname + '/../modules/*/entities/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
});
