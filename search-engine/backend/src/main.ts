import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"

dotenv.config({
        path: "env/development.env"
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
        app.enableCors()
  await app.listen(Number(process.env.PORT));
}
bootstrap();
