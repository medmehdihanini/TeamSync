import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Redirect } from "@nestjs/common";
import { Public } from "../Custom Decorators/public.decorator";
import { SharedAssetsService } from "../uses-case/Shared-Assets/shared-assets.service";
import { createSharedDto } from "../uses-case/Shared-Assets/DTO/CreateShared.dto";
import { findSharedDto } from "../uses-case/Shared-Assets/DTO/findSharedAssets.dto";

@Controller("SharedAssets")
export class SharedAssetsController {
  constructor(private SharedAssetsService: SharedAssetsService) {
  }


  @Public()
  @Post("create")
  addsharedassets(@Body() sharedassets: createSharedDto
  ) {
    return this.SharedAssetsService.createSharedAssets(sharedassets);
  }


  @Public()
  @Get("find")
  findsharedasseys(@Body() findsharedassets: findSharedDto
  ) {
    return this.SharedAssetsService.findFolderSharedAssets(findsharedassets);
  }




  @Public()
  @Get("findbyuser")
  findSharedAssetsByUser(@Body() Userid:findSharedDto
  ) {
    return this.SharedAssetsService.findSharedAssetsByUser(Userid);
  }



}
