import mongoose from "mongoose";
import { Body, Controller, Param, Post } from "@nestjs/common";
import { User } from "../Schema/User.Schema";
import { UserService } from "../uses-case/User";
import { Public } from "../Custom Decorators/public.decorator";
import { CreateFolderDto } from "../uses-case/Folder/DTO/CreateFolder.dto";
import { SharedService } from "../shared/shared-service/shared.service";
import { SharedAssetsService } from "../uses-case/Shared-Assets/shared-assets.service";
import { createSharedDto } from "../uses-case/Shared-Assets/DTO/CreateShared.dto";

@Controller('SharedAssets')
export class SharedAssetsController {
  constructor(private SharedAssetsService: SharedAssetsService) {
  }


  @Public()
  @Post("create")
  creatuser(@Body() sharedassets: createSharedDto,

  ) {
    return this.SharedAssetsService.createSharedAssets(sharedassets);
  }

}
