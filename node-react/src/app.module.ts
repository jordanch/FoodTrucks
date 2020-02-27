import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { SearchModule } from "./search/search.module"

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client")
    }),
    SearchModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
