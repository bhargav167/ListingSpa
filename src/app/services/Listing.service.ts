import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { ListItem } from '../Model/ListItem';
import { MasterList } from '../Model/MasterList';
@Injectable({
  providedIn: 'root'
})
export class ListingService {
  baseURL=environment.api_url;
  constructor(private _http:HttpClient) {  }
  AddJobPost(list: ListItem) {
    return this._http.post(this.baseURL + 'List/AddList', list);
  }
  AddMasterList(list: MasterList) {
    return this._http.post(this.baseURL + 'List/AddMasterList', list);
  }
  UpdateListItem(id: number, list: ListItem) {
    return this._http.post(this.baseURL + 'List/Update/' + id, list);
  }

  UpdateMasterListItem(id: number, list: MasterList) {
    return this._http.post(this.baseURL + 'List/UpdateMaster/' + id, list);
  }

  DeleteListItem(id: number) {
    return this._http.post(this.baseURL + 'List/Delete/' + id, {});
  }
  DeleteMasterListItem(id: number) {
    return this._http.post(this.baseURL + 'List/MasterDeleteDelete/' + id, {});
  }

  GetListByMaster(userId:number, id: number) {
    return this._http.get(this.baseURL + 'List/GetAllListItems/' + userId+'/'+id);
  }
  GetListById(id: number) {
    return this._http.get(this.baseURL + 'List/GetListItems/' + id);
  }

  GetMasterListByUserId(userId:number) {
    return this._http.get(this.baseURL + 'List/GetMasterListItems/' + userId);
  }
  GetMasterListById(Id:number) {
    return this._http.get(this.baseURL + 'List/GetMasterListItemsById/' + Id);
  }
}
