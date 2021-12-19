import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUser } from '../Model/AuthUser';
import { ListItem } from '../Model/ListItem';
import { MasterList } from '../Model/MasterList';
import { ListingService } from '../services/Listing.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})
export class HeaderComponent implements OnInit {
  listForm:FormGroup;
  public btnLoader: boolean;
  authUser:any;
  list:ListItem;
  masterList:MasterList[]=[];
  showAlert:boolean=false;
  constructor(private fb: FormBuilder, private _listingService: ListingService) { 
    this.authUser = JSON.parse(localStorage.getItem('user'));
    if (this.authUser == null)
      window.location.href = '/login';
  }

  ngOnInit() { 
    this.createListForm();
    this.LoadMasterList(this.authUser.data.Id);
   
  }
  createListForm() {
    this.listForm = this.fb.group({ 
      Id:[0],
      UserId:[0],
      Name: ['',Validators.required],
      MasterListId: [1,Validators.required],
    })
  } 

  AddJobPost() {  
    this.btnLoader=true; 
    this.listForm.controls['UserId'].setValue(this.authUser.data.Id); 
    this.list = Object.assign({}, this.listForm.value); 
     if(this.list.Id==0){
      this._listingService.AddJobPost(this.list).subscribe((data:any)=>{ 
        this.btnLoader=false; 
        this.listForm.reset();
        this.showAlert=true;
        this.LoadLists(this.authUser.data.Id,1); 
        setTimeout(() => {
          if (this.showAlert == true) {
            this.showAlert = false;
            this.listForm.controls['Id'].setValue(0);  
            this.listForm.controls['MasterListId'].setValue(1);
          }
        }, 3200);
        // Add Job Image
        
     
      },error=>{
        console.log(error);
      })
    }else{
      this._listingService.UpdateListItem(this.list.Id, this.list).subscribe((data:any)=>{ 
        this.btnLoader=false; 
        this.listForm.reset();
        this.showAlert=true;
        this.LoadLists(this.authUser.data.Id,1); 
        setTimeout(() => {
          if (this.showAlert == true) {
            this.showAlert = false;
            
            this.listForm.controls['Id'].setValue(0); 
            this.listForm.controls['MasterListId'].setValue(1);
          }
        }, 3200); 
      },error=>{
        console.log(error);
      })
    } 
  }

  LoadLists(userId:number, id:number){
    this._listingService.GetListByMaster(userId,id).subscribe((data:ListItem)=>{
      this.list=data; 
    })
  }
  LoadMasterList(userId){ 
    this._listingService.GetMasterListByUserId(userId).subscribe((data:MasterList[])=>{
      this.masterList=data;
      // this.LoadLists(this.authUser.data.Id,this.masterList[0].Id);
      console.log(this.masterList);
      if(this.authUser.Id==0)
      return;
    })
  }
  Edit(id){
    this._listingService.GetListById(id).subscribe((data:ListItem)=>{
      this.listForm.controls['Name'].setValue(data.Name); 
      this.listForm.controls['Id'].setValue(data.Id);
    })
  }
  Delete(id){
    var isDelete = confirm("Are you sure?");
    if(isDelete){
      this._listingService.DeleteListItem(id).subscribe((data:ListItem)=>{
       this.LoadLists(this.authUser.data.Id,1);
      })
    } 
  }
  Logout(){
    localStorage.clear();
    window.location.href='/login';
  }
}
