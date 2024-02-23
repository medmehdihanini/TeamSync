import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DocumentService } from "src/uses-case/Documents/document.service";
import { Documents } from "src/Schema/Documents.Schema";

@Controller('documents')
export class DocumentsController {


constructor(private docService:DocumentService){}

@Post('add')
addDocument(@Body() document:Documents){
return this.docService.addDocument(document);
}



@Delete('deletDoc/:id')
async DeleteDoc(@Param('id') id: string) {
  return this.docService.delete(id);
}


@Get('all')
GetAllDoc() {
  return this.docService.getAll();
}



@Get(':id')
async GetDocById(@Param('id') id: string) {
  return this.docService.getOne(id);
}


@Patch('/update')
async UpdateDoc(
  @Body() document:Documents
) {
 
  return this.docService.update(document) ;
}



}
