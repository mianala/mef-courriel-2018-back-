
/**
 * Created by Loharano on 7/13/2017.
 */

export class Flow {
  id : number;
  thread_id : number;
  content : string;
  entity : string;
  entity_label : string;
  n_arrive : number;
  date : Date;
  user_id : number;
  sender_entity_label : string;
  sender_entity_id : number;
  sender_header : number;
  sender_entity : string;
  n_depart : number;
  decommissioned : number;
  original_date : Date;
  direction : number;
  n_entity_created : number;
  previous_flow_id : number;
  destination : string;
  status_id : number;
  status_date : Date;
  project_id : number;
  project_date : Date;
  project_title : string;
  project_ref : string;
  numero : string;
  entity_title : string;
  sender_title : string;
  sender_be_header : string;

  getAllFlows(){}
  getShippedFlows(){}
  getSentFlows(){}
  getTreatedFlows(){}
  getProjectFlows(){}
  getFlow(){}
  replyFlow(){}
  treat(){}
  import(){}
  decommission(){}
  submit(){}
  share(){}
  ship(){}
  set(){}

}
