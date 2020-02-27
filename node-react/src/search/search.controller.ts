import { Get, Controller, Query } from "@nestjs/common";
import { ElasticsearchService } from "../elasticsearch/elasticsearch.service";

@Controller("/search")
export class SearchController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Get()
  async search(@Query("q") searchQuery) {
    console.log(`Search query: ${searchQuery}`);

    const results = await this.elasticsearchService.search(searchQuery);
    const hits = results.body.hits.hits;

    if (hits.length) {
      const vendors = new Map();
      const foodItems = new Map();
      const applicantTrucks = {};

      // filtering the results
      // todo: initial pass at converting python data transformation, seems OK but might be able to improve in performance and/or correctness
      for (const hit of hits) {
        const applicant = hit._source.applicant;
        vendors.set(applicant, hit);
      }

      for (const hit of hits) {
        const applicant = hit._source.applicant;

        if ("location" in hit._source) {
          const t = hit._source;

          const truck = {
            hours: t.dayshours || "NA",
            schedule: t.schedule || "NA",
            address: t.address || "NA",
            location: t.location || "NA"
          };

          foodItems.set(applicant, t.fooditems);

          if (!applicantTrucks[applicant]) {
            applicantTrucks[applicant] = [];
          }

          applicantTrucks[applicant].push(truck);
        }
      }

      // building up results
      const results = {
        trucks: []
      };

      let total = 0;

      for (const [applicant, trucks] of Object.entries(applicantTrucks)) {
        results.trucks.push({
          name: applicant,
          fooditems: formatFoodItems(foodItems.get(applicant)),
          branches: trucks,
          drinks: foodItems.get(applicant).includes("COLD TRUCK")
        });

        // todo: typing
        total = total + (trucks as []).length;
      }

      return {
        trucks: results.trucks,
        hits: hits.length,
        locations: total,
        status: "success"
      };
    } else {
      return [];
    }
  }
}

function formatFoodItems(s: string) {
  const items = s.split(":").map(s => s.toLowerCase());

  if (items[0].includes("cold truck")) {
    return items.slice(1);
  }

  return items;
}
