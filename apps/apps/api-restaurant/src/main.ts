import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { RestaurantModule } from "./restaurant.module";
import * as express from "express";

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(RestaurantModule);

  app.use(express.json({ limit: "50mb" }));
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(
    join(__dirname, "..", "apps/api-restaurant/email-templates")
  );
  app.setViewEngine("ejs");

  app.enableCors({
    origin: "*",
  });

  await app.listen(4002);
}
bootstrap();
