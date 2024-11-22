import { Logger } from '@nestjs/common';
import { App } from './app';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await App();

  const port = process.env.PORT ?? 5000;

  await app.listen(port);

  logger.log(`Server running on http://localhost:${port}`);
}
bootstrap();
