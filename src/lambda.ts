import serverlessExpress from '@codegenie/serverless-express';

import { Callback, Context, Handler } from 'aws-lambda';

import { App } from './app';

let server: Handler;

async function bootstrap() {
  const app = await App();

  app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
