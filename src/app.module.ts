import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserService } from "src/user.service";
import { PrismaService } from "src/prisma.service";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
