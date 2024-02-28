import { Module } from '@nestjs/common';
import { MongoDataServiceModule } from './Config/Mongo/mongo-data-service.module';
import { UserModule } from './uses-case/User/user.module';
import { ConfigModule } from '@nestjs/config';
import { SharedServiceModule } from './shared/shared-service/shared-service.module';
import { CollaboorationlogModule } from './uses-case/Collabooration-Log/collaboorationlog.module';
import { DocumentModule } from './uses-case/Documents/document.module';
import { SharedService } from "./shared/shared-service/shared.service";
import { FolderModule } from './uses-case/Folder/folder.module';
import { SharedAssetsModule } from './uses-case/Shared-Assets/shared-assets.module';
import { SettingsModule } from './uses-case/Settings/settings.module';
import { VersionHistoryModule } from './uses-case/Version-History/version-history.module';
import { AuthModule } from './uses-case/Auth/auth.module';
import { MailModule } from './uses-case/email/mail.module';



@Module({
  imports: [
    ConfigModule.forRoot(), MailModule,
    MongoDataServiceModule,
    UserModule,
    SharedServiceModule,
    CollaboorationlogModule,
    DocumentModule,
    FolderModule,
    SharedAssetsModule,
    SettingsModule,
    VersionHistoryModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [
    SharedService,    
  ],
})
export class AppModule { }
