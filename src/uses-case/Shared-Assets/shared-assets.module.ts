import { Module } from "@nestjs/common";
import { SharedAssetsService } from "./shared-assets.service";
import { SharedAssetsController } from "../../Controllers/SharedAssets.controller";
import { SharedAssetsRepository } from "./Shared-Assets-Repo/SharedAssets.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { SharedAssets, SharedAssetsSchema } from "../../Schema/SharedAssets.Schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: SharedAssets.name, schema: SharedAssetsSchema }])],
  controllers: [SharedAssetsController],
  providers: [SharedAssetsService, SharedAssetsRepository,
    {
      provide: "SharedAssetsRepositoryInterface",
      useClass: SharedAssetsRepository
    }]
})
export class SharedAssetsModule {
}
