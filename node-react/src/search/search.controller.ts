import { Get, Controller, Query } from "@nestjs/common"

@Controller("/search")
export class SearchController {
  constructor() {}

  @Get()
  search(@Query("q") searchQuery) {
    console.log(searchQuery)
  }
}
