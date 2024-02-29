import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FolderRepository } from "./Folder-repo/folder.repository";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Schema/User.Schema";
import mongoose, { Model, Types } from "mongoose";
import { Folder } from "../../Schema/Folder.Schema";
import { CreateFolderDto } from "./DTO/CreateFolder.dto";
import { SharedService } from "../../shared/shared-service/shared.service";
import { UpdateFolderDto } from "./DTO/UpdateFolder.dto";
import { UserRepository } from "../User";
import { SimpleFolderDto } from "./DTO/SimpleFolder.dto";

@Injectable()
export class FolderService {

  constructor(private folderRepository: FolderRepository,
              private userRepository: UserRepository,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Folder.name) private Foldermodel: Model<Folder>,
              private sharedService: SharedService
  ) {
  }

  async AddFolder({createdby,...folder}: CreateFolderDto, parentID: string) {
    let folders=(await this.folderRepository.find({ foldername:folder.foldername})).length
    if (this.sharedService.isValidObjectId(createdby)) {
      const folderData = {
        ...folder,
        createdby: createdby
      };

      if (this.sharedService.isValidObjectId(parentID)) {
        folderData.parentfolder = parentID;
      }
      if(folders!=0){
        folderData.foldername=folderData.foldername+" ("+folders+")"
      }

      const newFolder = new this.Foldermodel(folderData);

      return await newFolder.save();
    } else {
      throw new HttpException("Invalid User ID", HttpStatus.BAD_REQUEST);
    }
  }


  DelteFolder(id: string) {
    return this.folderRepository.delete(id);
  }

  DelteallFolder(ids: string[]) {
    return Promise.all(ids.map(async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('invalide ID', 400);
      this.folderRepository.delete(id)}));
  }

  FindAllFolder() {
    return this.folderRepository.findAll();
  }


  FindFolderByUser(UserID: string) {
    if (this.sharedService.isValidObjectId(UserID)) {
      return this.folderRepository.find({ createdby: UserID });
    }

  }

  FindFolderByParent(parentID: string) {
    return this.folderRepository.findOne({ parentfolder: parentID });

  }

  findOneFolder(id: string) {
    if (this.sharedService.isValidObjectId(id)) {
      return this.folderRepository.findById(id);

    }
  }

  findFolderByParent(parentID: string) {
    return this.folderRepository.find({ parentfolder: parentID });
  }

  UpdateFolder(id: string, Updatefolderdto: UpdateFolderDto) {
    if (this.sharedService.isValidObjectId(id)) {
      return this.folderRepository.update(id, Updatefolderdto);
    }

  }

  async getAllby(parentId: string, name: string, createdBy: string, createdDate: Date, lastUpdate: Date, page: number = 1, limit: number = 10) {
    const query: any = {};
  if (parentId && Types.ObjectId.isValid(parentId)) {
    query.parentfolder = new  Types.ObjectId(parentId);
  }
  if (createdBy && Types.ObjectId.isValid(createdBy)) {
    query.createdby = new  Types.ObjectId(createdBy);
  }
  if (createdDate) {
    query.createat = { $gte: createdDate };
  }
  if (lastUpdate) {
    query.Updateat = { $lte: lastUpdate };
  }
  if (name) {
    query.foldername = { $regex: `^${name}`, $options: 'i' };
  }
  try {
    const result = await this.folderRepository.findAllWithPagination(query, page, limit);
    const totaldata = result.totaldata;
    const totalPages = Math.ceil(totaldata / limit);
    const data: SimpleFolderDto[] = result.data.map((folder: any) => {
      const simplefolderDto: SimpleFolderDto = new SimpleFolderDto();
      simplefolderDto.id = folder.id;
      simplefolderDto.title = folder.foldername;
      simplefolderDto.createdby = folder.createdby;
      simplefolderDto.createdat = folder.createdat;
      simplefolderDto.updatedat = folder.Updateat;
      return simplefolderDto;
    });
    return {
      data,
      currentPage: page,
      totalPages,
      totaldata
    };
  } catch (error) {
    throw new Error(`Error retrieving documents: ${error}`);
  }
  }


}
