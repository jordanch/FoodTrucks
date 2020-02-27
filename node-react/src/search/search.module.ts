import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { ElasticSearchModule } from "../elasticsearch/elasticsearch.module";

@Module({
  controllers: [SearchController],
  imports: [ElasticSearchModule]
})
export class SearchModule {}
