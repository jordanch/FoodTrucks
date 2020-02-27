import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { SearchModule } from "./search/search.module";
import { ElasticSearchModule } from "./elasticsearch/elasticsearch.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client")
    }),
    ElasticSearchModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
