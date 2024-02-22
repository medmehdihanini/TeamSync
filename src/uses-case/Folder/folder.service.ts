import { HttpException, Injectable } from "@nestjs/common";
import { FolderRepository } from "./Folder-repo/folder.repository";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Schema/User.Schema";
import { Model } from "mongoose";
import { Folder } from "../../Schema/Folder.Schema";
import { CreateFolderDto } from "./DTO/CreateFolder.dto";
import { SharedService } from "../../shared/shared-service/shared.service";
import { UpdateFolderDto } from "./DTO/UpdateFolder.dto";

@Injectable()
export class FolderService {

  constructor(private folderRepository: FolderRepository,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Folder.name) private Foldermodel: Model<Folder>,
              private sharedService: SharedService
  ) {
  }

  AddFolder(folder:CreateFolderDto, parentID: string,UserID:string) {
    if (this.sharedService.isValidObjectId(parentID) && this.sharedService.isValidObjectId(UserID)) {
      const NewFolder = new this.Foldermodel({
        ...folder,
        parentfolder: parentID,
        createdby: UserID
      });
      return NewFolder.save();
    }
    if(this.sharedService.isValidObjectId(UserID)) {
      const NewFolder = new this.Foldermodel({
        ...folder,
        createdby: UserID
      });
      return NewFolder.save();
    }
    throw new HttpException('Invalid ID or Invalid ParentID', 400);
  }

DelteFolder(id: string) {
    return this.folderRepository.delete(id);
}

FindAllFolder() {
    return this.folderRepository.findAll();
}


FindFolderByUser(UserID: string) {
    if(this.sharedService.isValidObjectId(UserID)) {
      return this.folderRepository.findOne({ createdby: UserID });
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


UpdateFolder(id: string, Updatefolderdto: UpdateFolderDto) {
    if (this.sharedService.isValidObjectId(id)) {
      return this.folderRepository.update(id, Updatefolderdto);
}

}


}
