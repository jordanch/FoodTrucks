import { Client } from "@elastic/elasticsearch";
import fetch from "node-fetch";

export const ELASTICSEARCH_CLIENT = "ELASTICSEARCH_CLIENT";

export const elasticsearchProviders = [
  {
    provide: ELASTICSEARCH_CLIENT,
    useFactory: async () => {
      const client = new Client({ node: "http://localhost:9200" });

      const { statusCode } = await client.indices.exists({ index: "esdata" });
      const exists = statusCode === 200;

      if (!exists) {
        console.debug("esdata does not exist");
        console.debug("Loading esdata into elastic search...");

        const response = await fetch(
          "http://data.sfgov.org/resource/rqzj-sfat.json"
        );

        // todo: any.
        const data = (await response.json()) as any[];

        for (const truck of data) {
          await client.index({
            index: "esdata",
            type: "truck",
            id: truck.id,
            body: truck
          });
        }
      } else {
        console.debug("esdata exists!");
      }

      return client;
    }
  }
];
