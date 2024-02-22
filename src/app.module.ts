import { Module } from '@nestjs/common';

import { MongoDataServiceModule } from './Config/Mongo/mongo-data-service.module';

import { UserModule } from './uses-case/User/user.module';

import { SharedServiceModule } from './shared/shared-service/shared-service.module';
import { CollaboorationlogModule } from './uses-case/Collabooration-Log/collaboorationlog.module';
import { DocumentModule } from './uses-case/Documents/document.module';
import { SharedService } from "./shared/shared-service/shared.service";
import { FolderModule } from './uses-case/Folder/folder.module';
import { SharedAssetsModule } from './uses-case/Shared-Assets/shared-assets.module';
import { SettingsModule } from './uses-case/Settings/settings.module';
import { VersionHistoryModule } from './uses-case/Version-History/version-history.module';

@Module({
  imports: [

    MongoDataServiceModule,
    UserModule,
    SharedServiceModule,
    CollaboorationlogModule,
    DocumentModule,
    FolderModule,
    SharedAssetsModule,
    SettingsModule,
    VersionHistoryModule,
  ],
  controllers: [],
  providers: [
SharedService



  ],
})
export class AppModule {}
