import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle("api - bangunkota.com")
      .setDescription("api description of bangunkota.com application")
      .setVersion("1.0")
      .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/", app, document)

  await app.listen(3000);
}
bootstrap();
