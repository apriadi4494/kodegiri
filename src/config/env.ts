import * as dotenv from 'dotenv';
dotenv.config();

export const APP_PORT = Number(process.env.APP_PORT);
export const APP_NAME: string = process.env.APP_NAME;

export const SWAGGER_URL: string = process.env.SWAGGER_URL;
export const SWAGGER_VERSION: string = process.env.SWAGGER_VERSION;

export const JWT_SECREET = process.env.JWT_SECREET;
export const JWT_EXPIRES = process.env.JWT_EXPIRES;
export const JWT_EXPIRES_REFRESH_TOKEN = process.env.JWT_EXPIRES_REFRESH_TOKEN;
