import * as dotenv from 'dotenv';
dotenv.config();

export const APP_PORT = Number(process.env.APP_PORT);
export const APP_NAME: string = process.env.APP_NAME;

export const SWAGGER_URL: string = process.env.SWAGGER_URL;
export const SWAGGER_VERSION: string = process.env.SWAGGER_VERSION;
