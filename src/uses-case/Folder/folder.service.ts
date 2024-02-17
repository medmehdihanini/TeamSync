import { Injectable } from '@nestjs/common';
import { FolderRepository } from './Folder-repo/folder.repository';

@Injectable()
export class FolderService {

  constructor(private folderRepository: FolderRepository) {}

}
