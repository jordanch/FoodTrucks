import { Module } from "@nestjs/common";
import { elasticsearchProviders } from "./elasticsearch.provider";
import { ElasticsearchService } from "./elasticsearch.service";

@Module({
  providers: [...elasticsearchProviders, ElasticsearchService],
  exports: [ElasticsearchService]
})
export class ElasticSearchModule {}
