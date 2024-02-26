import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1", { exclude: ["/"] });

  await app.listen(port, "0.0.0.0");
}
bootstrap();
