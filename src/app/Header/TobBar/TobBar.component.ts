import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ListItem } from 'src/app/Model/ListItem';
import { MasterList } from 'src/app/Model/MasterList';
import { ListingService } from 'src/app/services/Listing.service';
import { environment } from 'src/environments/environment'; 
import { Clipboard } from '@angular/cdk/clipboard';
function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return  false;  
  }

  return true;
}
@Component({
  selector: 'app-TobBar',
  templateUrl: './TobBar.component.html',
  styleUrls: ['./TobBar.component.css']
})
export class TobBarComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal1') closeAddExpenseModal1: ElementRef;
  @ViewChild('closeAddExpenseModal3') closeAddExpenseModal3: ElementRef;
  listForm:FormGroup;
  listMasterForm:FormGroup;
  public btnLoader: boolean;
  public btnLoader1: boolean;
  public btnLoader2: boolean;
  authUser:any;
  list:ListItem;
  masterListitem:MasterList;
  masterList:MasterList[]=[];
  showAlert:boolean=false;
  sharedLink:any;

  masterSelectedList: string;
  masterSelectedListDate: string;
  masterSelectedListId: number;

  ListId: number;
  ListHead: string;
  ListDesc: string; 
  constructor(private fb: FormBuilder, 
    private _listingService: ListingService,private route: Router,private clipboard: Clipboard) {
    if (localStorage.getItem('user') == null)
      window.location.href = '/login'
    this.authUser = JSON.parse(localStorage.getItem('user')); 
  }

  ngOnInit() { 
    this.createListForm();
    this.createMasterListForm();
    this.LoadMasterList(this.authUser.data.Id);
  }
  createListForm() {
    this.listForm = this.fb.group({ 
      Id:[0],
      UserId:[0],
      Name: ['',Validators.required],
      Hash:[''],
      Host:[''],
      HostName:[''],
      Origin:[''],
      Link:[''],
      PathName:[''],
      UserName:[''],
      SearchParams:[''],
      MasterListId: [0,Validators.required],
    })
  } 
  createMasterListForm() {
    this.listMasterForm = this.fb.group({
      Id:[0],
      UserId:[0],
      CreatedDate:[],
      Name: ['',Validators.required]
    })
  } 
  AddJobPost() {
    let isUrl = isValidHttpUrl(this.listForm.controls['Name'].value);
    if (isUrl) {
      const url = new URL('', this.listForm.controls['Name'].value);
           let nn=url.hostname.substring(
        url.hostname.indexOf(".") + 1, 
        url.hostname.lastIndexOf(".")
    );
    if(nn=='.'){
      let nn1=url.hostname.substring(
        url.hostname.indexOf("/") + 1, 
        url.hostname.lastIndexOf("."));
      this.listForm.controls['HostName'].setValue(nn1); 
    }else{
      this.listForm.controls['HostName'].setValue(nn); 
    }
      this.listForm.controls['Host'].setValue(url.host); 
      this.listForm.controls['Hash'].setValue(url.hash); 
      
      this.listForm.controls['Origin'].setValue(url.origin); 
      this.listForm.controls['Link'].setValue(url.href); 
      this.listForm.controls['PathName'].setValue(url.pathname); 
      this.listForm.controls['UserName'].setValue(url.username); 
      this.listForm.controls['SearchParams'].setValue(url.search); 
      this.listForm.controls['UserId'].setValue(this.authUser.data.Id);  
     

      this.list = Object.assign({}, this.listForm.value); 
       if(this.list.Id==0){
        this.btnLoader=true; 
        this._listingService.AddJobPost(this.list).subscribe((data:any)=>{ 
        
          this.listForm.reset();
          this.showAlert=true;
          this.LoadLists(this.authUser.data.Id,this.masterSelectedListId); 
          this.btnLoader=false; 
          setTimeout(() => {
            if (this.showAlert == true) {
              this.showAlert = false;
              this.listForm.controls['Id'].setValue(0);  
              this.listForm.controls['MasterListId'].setValue(this.masterSelectedListId);
            }
          }, 3200);
          // Add Job Image


        },error=>{
          console.log(error);
        })
      }else{
        let isUrl = isValidHttpUrl(this.listForm.controls['Name'].value);
        if (isUrl) {
          const url = new URL('', this.listForm.controls['Name'].value);
               let nn=url.hostname.substring(
            url.hostname.indexOf(".") + 1, 
            url.hostname.lastIndexOf(".")
        );
        if(nn=='.'){
          let nn1=url.hostname.substring(
            url.hostname.indexOf("/") + 1, 
            url.hostname.lastIndexOf("."));
          this.listForm.controls['HostName'].setValue(nn1); 
        }else{
          this.listForm.controls['HostName'].setValue(nn); 
        }
        this.listForm.controls['Host'].setValue(url.host); 
        this.listForm.controls['Hash'].setValue(url.hash); 
        
        this.listForm.controls['Origin'].setValue(url.origin); 
        this.listForm.controls['Link'].setValue(url.href); 
        this.listForm.controls['PathName'].setValue(url.pathname); 
        this.listForm.controls['UserName'].setValue(url.username); 
        this.listForm.controls['SearchParams'].setValue(url.search); 
        this.listForm.controls['UserId'].setValue(this.authUser.data.Id);
        this.list = Object.assign({}, this.listForm.value);
      }
    
      console.log(this.list)
        this.btnLoader1=true;
        this._listingService.UpdateListItem(this.list.Id, this.list).subscribe((data:any)=>{ 
          this.btnLoader=false; 
          this.listForm.reset();
          this.showAlert=true;
          this.LoadLists(this.authUser.data.Id,this.masterSelectedListId); 
          this.listForm.controls['Id'].setValue(0); 
          this.listForm.controls['MasterListId'].setValue(this.masterSelectedListId);
          this.btnLoader1=false;
          this.ModalClose();
          this.closeAddExpenseModal3.nativeElement.click();
        },error=>{
          console.log(error);
          this.btnLoader1=false;
        })
      } 
 
    } else {
      this.listForm.controls['Host'].setValue(this.listForm.controls['Name'].value); 
      this.listForm.controls['Hash'].setValue(this.listForm.controls['Name'].value); 
      this.listForm.controls['HostName'].setValue(this.listForm.controls['Name'].value); 
      this.listForm.controls['Origin'].setValue(this.listForm.controls['Name'].value); 
      this.listForm.controls['Link'].setValue(this.listForm.controls['Name'].value); 
      this.listForm.controls['PathName'].setValue(this.listForm.controls['Name'].value); 
      this.listForm.controls['UserName'].setValue(this.listForm.controls['Name'].value); 
      this.listForm.controls['SearchParams'].setValue(this.listForm.controls['Name'].value); 
      this.listForm.controls['UserId'].setValue(this.authUser.data.Id);  
      this.btnLoader=true; 

      this.list = Object.assign({}, this.listForm.value); 
       if(this.list.Id==0){
        this._listingService.AddJobPost(this.list).subscribe((data:any)=>{ 
          this.btnLoader=false; 
          this.listForm.reset();
          this.showAlert=true;
          this.LoadLists(this.authUser.data.Id,this.masterSelectedListId); 
          setTimeout(() => {
            if (this.showAlert == true) {
              this.showAlert = false;
              this.listForm.controls['Id'].setValue(0);  
              this.listForm.controls['MasterListId'].setValue(this.masterSelectedListId);
            }
          }, 3200);
          // Add Job Image


        },error=>{
          console.log(error);
        })
      }else{
        this.btnLoader1=true; 
        this._listingService.UpdateListItem(this.list.Id, this.list).subscribe((data:any)=>{ 
        
          this.listForm.reset();
          this.showAlert=true;
          this.LoadLists(this.authUser.data.Id,this.masterSelectedListId); 
          this.listForm.controls['Id'].setValue(0); 
              this.listForm.controls['MasterListId'].setValue(this.masterSelectedListId);
              this.btnLoader1=false; 
              this.ModalClose();
        },error=>{
          console.log(error);
        })
      } 
 
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
      this.masterSelectedList=this.masterList[0].Name; 
      this.masterSelectedListDate=this.masterList[0].DateFormat;
      this.listForm.controls['MasterListId'].setValue(this.masterList[0].Id); 
      
      this.masterSelectedListId=this.masterList[0].Id;
       this.LoadLists(this.authUser.data.Id,this.masterList[0].Id);
      if(this.authUser.Id==0)
      return;
    })
  }
  LoadListItem(id,name){ 
    this._listingService.GetMasterListById(id).subscribe((data:MasterList)=>{
      this.masterSelectedListId=id; 
      this.listForm.controls['MasterListId'].setValue(id); 
      this.LoadLists(this.authUser.data.Id,id);
      this.masterSelectedList=name;
      this.masterSelectedListDate=data.DateFormat;
    })

  }
  Edit(id){
    this._listingService.GetListById(id).subscribe((data:ListItem)=>{
      this.listForm.controls['Name'].setValue(data.Name); 
      this.listForm.controls['Id'].setValue(data.Id);
      this.ListHead=data.Host;
      this.ListDesc=data.HostName;
      this.ListId=data.Id;
    })
  }
  Delete(){
    var isDelete = confirm("Are you sure?");
    if(isDelete){
      this.btnLoader2=true;
      this._listingService.DeleteListItem(this.ListId).subscribe((data:ListItem)=>{
       this.LoadLists(this.authUser.data.Id,this.masterSelectedListId);
       this.ModalClose();
       this.btnLoader2=false;
       this.closeAddExpenseModal3.nativeElement.click();
      })
    } 
  }

  DeleteMaster(){
    var isDelete = confirm("Are you sure?");
    if(isDelete){
      this.btnLoader2=true;
      this._listingService.DeleteMasterListItem(this.masterSelectedListId).subscribe((data:MasterList)=>{
        this.LoadLists(this.authUser.data.Id,this.masterList[0].Id);
       this.ModalClose();
       this.btnLoader2=false;
       this.closeAddExpenseModal.nativeElement.click();
      })
    } 
  }

  addMasterList(){ 
    this.listMasterForm.controls['UserId'].setValue(this.authUser.data.Id); 
    this.listMasterForm.controls['CreatedDate'].setValue(new Date());
    this.masterListitem = Object.assign({}, this.listMasterForm.value); 
     if(this.masterListitem.Id==0){
      this.btnLoader1=true; 
      this._listingService.AddMasterList(this.masterListitem).subscribe((data:any)=>{  
        this.listMasterForm.reset();
        this.showAlert=true; 
        this.listMasterForm.controls['Id'].setValue(0);  
        this.closeAddExpenseModal1.nativeElement.click(); 
        this.btnLoader1=false; 
      this.LastMasterListAdded(this.authUser.data.Id);
      },error=>{
        console.log(error);
      })
    }else{ 
      this.btnLoader1=true; 
      this._listingService.UpdateMasterListItem(this.masterListitem.Id, this.masterListitem).subscribe((data:MasterList)=>{  
        this.btnLoader1=false; 
        this.listMasterForm.reset();
        this.showAlert=true; 
        this.closeAddExpenseModal.nativeElement.click(); 
        this.listMasterForm.controls['Id'].setValue(0);
        this.listMasterForm.controls['MasterListId'].setValue(data.Id);
        this.listMasterForm.controls['Name'].setValue(data.Name);
      },error=>{
        console.log(error);
      })
    } 
  }

  LastMasterListAdded(userId:number){
    this._listingService.GetMasterListByUserId(userId).subscribe((data:MasterList[])=>{
      this.masterList=data; 
      this.masterSelectedList=this.masterList[this.masterList.length-1].Name; 
      this.masterSelectedListDate=this.masterList[this.masterList.length-1].DateFormat;
      this.listForm.controls['MasterListId'].setValue(this.masterList[this.masterList.length-1].Id); 
      
      this.masterSelectedListId=this.masterList[this.masterList.length-1].Id;
       this.LoadLists(this.authUser.data.Id,this.masterList.length-1);
      if(this.authUser.Id==0)
      return;
    })
  }
  GetMasterList(){  
    this._listingService.GetMasterListById(this.masterSelectedListId).subscribe((data:MasterList)=>{ 
      this.listMasterForm.controls['Id'].setValue(data.Id);
      this.listMasterForm.controls['Name'].setValue(data.Name);
    })
  }
//Shared Link
GetSharedLink(){
  this.sharedLink=`http://listing555-001-site1.ctempurl.com/sharedLink?userId=${this.authUser.data.Id}&masterListId=${this.masterSelectedListId}&names=${this.masterSelectedList}&displayDate=${this.masterSelectedListDate}`
  this.clipboard.copy(this.sharedLink);
}
  //Modal
  ModalClose(){
    this.listForm.controls['Name'].setValue(''); 
    this.listForm.controls['Id'].setValue(0);
  }
  CloseMasterModal(){
    this.listMasterForm.controls['Name'].setValue(''); 
    this.listMasterForm.controls['Id'].setValue(0);
  }
  Logout(){
    localStorage.clear();
    window.location.href='/login';
  }
  HomeRedirect(){
    window.location.href='/';
  }
}
