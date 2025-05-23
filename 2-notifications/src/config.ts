import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public NODE_ENV: string | undefined;
  public CLIENT_UR: string | undefined;
  public RABBITMQ_URL: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_EMAIL_PASSWORD: string | undefined;
  public ELASTICSEARCH_URL: string | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.CLIENT_UR = process.env.CLIENT_UR || '';
    this.RABBITMQ_URL = process.env.RABBITMQ_URL || '';
    this.SENDER_EMAIL = process.env.SENDER_EMAIL || '';
    this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
    this.ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || '';
  }
}

export const config = new Config();
