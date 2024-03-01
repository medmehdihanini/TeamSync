import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { DocumentService } from "src/uses-case/Documents/document.service";
import { Documents } from "src/Schema/Documents.Schema";
import { Public } from 'src/Custom Decorators/public.decorator';

@Controller('documents')
export class DocumentsController {


constructor(private docService:DocumentService){}

@Public()
@Post('add')
addDocument(@Body() document:Documents){
return this.docService.addDocument(document);
}


@Public()
@Delete('deletDoc/:id')
async DeleteDoc(@Param('id') id: string) {
  return this.docService.delete(id);
}
@Public()
  @Delete('deleteAlldocs')
  async deleteAlldocs(@Body() ids: string[]) {
    return this.docService.Deltealldocs(ids);
  }
@Public()
@Get('getAlldocsby')
async getAllby(
@Query('parentId') parentId?: string,
@Query('name') name?: string,
@Query('createdBy') createdBy?: string,
@Query('sortupdated') sortupdated?:string,
@Query('createdDate') createdDate?: Date,
@Query('lastUpdate') lastUpdate?: Date,
@Query('page') page: number = 1,
@Query('limit') limit: number = 10
) {
return await this.docService.getAllby(parentId, name, createdBy, createdDate,sortupdated, lastUpdate, page, limit);
}

@Public()
@Get('getAllDocAndFoldersBy')
async getAllDocAndFolderby(
@Query('parentId') parentId?: string,
@Query('name') name?: string,
@Query('createdBy') createdBy?: string,
@Query('sortupdated') sortupdated?:string,
@Query('createdDate') createdDate?: Date,
@Query('lastUpdate') lastUpdate?: Date,
@Query('page') page: number = 1,
@Query('limit') limit: number = 10
) {
return await this.docService.getAllDocAndFolderby(parentId, name, createdBy,sortupdated, createdDate, lastUpdate, page, limit);
}


@Public()
@Get('all')
GetAllDoc() {
  return this.docService.getAll();
}



@Public()
@Get(':id')
async GetDocById(@Param('id') id: string) {
  return this.docService.getOne(id);
}

@Public()
@Patch('update')
async UpdateDoc(
  @Body() document:Documents
) {
  return this.docService.update(document) ;
}



}
