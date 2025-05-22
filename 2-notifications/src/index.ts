import 'express-async-errors';
import { winstonLogger } from 'helpers';
import { config } from './config';
import { Application } from 'express';
import { Logger } from 'winston';
import { Server as HttpServer } from 'http';

const SERVICE_PORT = 4001;
const notificationServiceLogger: Logger = winstonLogger(
  `${config.ELASTICSEARCH_URL}`,
  'notification-service',
  'debug'
);

export function initialize(app: Application): void {
  startService(app);
  initializeElasticSearch();
  initializeQueue();
}

async function initializeQueue(): Promise<void> {
  // Initialize the queue here
  // For example, you can use Bull or any other queue library
  // const queue = new Queue('notificationQueue', {
  //   redis: {
  //     host: config.REDIS_HOST,
  //     port: config.REDIS_PORT,
  //   },
  // });
}

function initializeElasticSearch(): void {
  // Initialize Elasticsearch client here
  // For example, you can use the official Elasticsearch client
  // const client = new Client({
  //   node: config.ELASTICSEARCH_URL,
  //   auth: {
  //     username: config.ELASTICSEARCH_USERNAME,
  //     password: config.ELASTICSEARCH_PASSWORD,
  //   },
  // });
}

function startService(app: Application): void {
  try {
    const httpServer: HttpServer = new HttpServer(app);
    notificationServiceLogger.info(
      `Worker with process id of ${process.pid} of notification service has started.`
    );
    httpServer.listen(SERVICE_PORT, () => {
      notificationServiceLogger.info(
        `Notification service is running on port ${SERVICE_PORT}`
      );
    });
  } catch (error) {
    notificationServiceLogger.log(
      'error',
      'Notification Service - startService(): Error starting notification service',
      error
    );
  }
  app.listen(SERVICE_PORT, () => {
    notificationServiceLogger.info(
      `Notification service is running on port ${SERVICE_PORT}`
    );
  });
}
