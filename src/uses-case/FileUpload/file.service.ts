import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucket, GridFSBucketReadStream } from 'mongodb';
import { DATA_BASE_CONFIGURATION } from 'src/Config/Mongo/Index';
import { FileInfoVm } from './model/FileInfoVm ';

@Injectable()
export class FileService {
  private fileModel: MongoGridFS;
  private isModelInitialized: boolean = false;

  constructor() {
    this.initializeFileModel();
  }

  private async initializeFileModel(): Promise<void> {
    const MongoClient = require('mongodb').MongoClient;
    const client = new MongoClient(DATA_BASE_CONFIGURATION.mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db();
      this.fileModel = new MongoGridFS(db, 'fs');
      this.isModelInitialized = true;
    } catch (err) {
      console.log(new HttpException('Failed to connect to MongoDB', HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  private async ensureModelInitialized(): Promise<void> {
    if (!this.isModelInitialized) {
      await this.initializeFileModel();
      if (!this.isModelInitialized) {
        throw new HttpException('Failed to initialize file model', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    await this.ensureModelInitialized();
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    await this.ensureModelInitialized();

    const result = await this.fileModel.findById(id).catch(err => {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    });

    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: "", // You can set md5 to an empty string or any default value here
      contentType: result.contentType
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    await this.ensureModelInitialized();
    return await this.fileModel.delete(id);
  }

}
