import winston, { Logger } from 'winston';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
  LogData,
  TransformedData,
} from 'winston-elasticsearch';

/**
 * Transforms log data into a format suitable for Elasticsearch.
 *
 * @param logData - The log data to be transformed.
 * @returns The transformed log data compatible with Elasticsearch.
 */
const esTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData);
};

/**
 * Creates a Winston logger configured with console and Elasticsearch transports.
 *
 * @param {string} elasticSearchNode - The URL of the Elasticsearch node.
 * @param {string} name - The name of the service using the logger.
 * @param {string} level - The logging level (e.g., 'info', 'debug').
 * @returns {Logger} A configured Winston logger instance.
 */
export const winstonLogger = (
  elasticSearchNode: string,
  name: string,
  level: string
): Logger => {
  const options = {
    console: {
      level,
      handleExceptions: true,
      json: false,
      colorize: true,
    },
    elasticsearch: {
      level,
      transformer: esTransformer,
      clientOpts: {
        node: elasticSearchNode,
        log: level,
        maxRetries: 5,
        requestTimeout: 10000,
        sniffOnStart: false,
        // auth: {
        //   username: process.env.ELASTICSEARCH_USERNAME,
        //   password: process.env.ELASTICSEARCH_PASSWORD
        // }
      },
    },
  };

  const esTransport: ElasticsearchTransport = new ElasticsearchTransport(
    options.elasticsearch
  );

  const logger: Logger = winston.createLogger({
    exitOnError: false,
    defaultMeta: { service: name },
    transports: [new winston.transports.Console(options.console), esTransport],
  });

  return logger;
};
