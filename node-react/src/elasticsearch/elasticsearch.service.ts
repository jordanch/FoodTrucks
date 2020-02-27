import { Client } from "@elastic/elasticsearch";
import { Inject, Injectable } from "@nestjs/common";

import { ELASTICSEARCH_CLIENT } from "./elasticsearch.provider";

@Injectable()
export class ElasticsearchService {
  @Inject(ELASTICSEARCH_CLIENT) private readonly client: Client;
  constructor() {}

  search(param: string) {
    return this.client.search({
      index: "esdata",
      body: {
        query: { match: { fooditems: param } },
        size: 750 // max document size
      }
    });
  }
}
