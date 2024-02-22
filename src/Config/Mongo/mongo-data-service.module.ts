import { Module } from '@nestjs/common';
import { DATA_BASE_CONFIGURATION } from 'src/Config/Mongo'
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from "mongoose";


@Module({

imports:[MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString)],
  providers:[],
exports:[]
})
export class MongoDataServiceModule {
}
