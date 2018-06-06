/**
 * Created by Moon Byul on 6/2/2018.
 */

export class File{
  id:number;
  type:number;
  filename:string;
  originalname:string;
  date:Date;
  size:number;
  src:string;
  type_id:number;
  mimetype:string;

  saveProjectFiles(){}
  saveThreadFiles(){}
  saveFlowFiles(){}
  getFlowFiles(){}
  getTemplateFiles(){}
  getProjectFiles(){}
  getThreadFiles(){}

}
