import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FolderRepository } from "./Folder-repo/folder.repository";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Schema/User.Schema";
import { Model } from "mongoose";
import { Folder } from "../../Schema/Folder.Schema";
import { CreateFolderDto } from "./DTO/CreateFolder.dto";
import { SharedService } from "../../shared/shared-service/shared.service";
import { UpdateFolderDto } from "./DTO/UpdateFolder.dto";
import { UserRepository } from "../User";

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


    if (this.sharedService.isValidObjectId(createdby)) {
      const folderData = {
        ...folder,
        createdby: createdby
      };

      if (this.sharedService.isValidObjectId(parentID)) {
        folderData.parentfolder = parentID;
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


  deleteSelcetedFolder(id: string[]) {
    for (let i = 0; i < id.length; i++) {

        this.folderRepository.delete(id[i]);

    }

  }


}
