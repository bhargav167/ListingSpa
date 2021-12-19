import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ListItem } from 'src/app/Model/ListItem';
import { ListingService } from 'src/app/services/Listing.service';
@Component({
  selector: 'app-SharedLink',
  templateUrl: './SharedLink.component.html',
  styleUrls: ['./SharedLink.component.css']
})
export class SharedLinkComponent implements OnInit {
  list:ListItem;
  authUser:any;
  displaydate:string;
  name:string;
  constructor(private route: ActivatedRoute,private _listingService: ListingService) {
    if (localStorage.getItem('user') == null)
      window.location.href = '/login'
    this.authUser = JSON.parse(localStorage.getItem('user')); 
   }
  
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.LoadLists(parseInt(params.get('userId')),parseInt(params.get('masterListId')))
      this.name= params.get('names');
    this.displaydate= params.get('displayDate');
    }
     
      
      ); // output:  
   
  }
LoadLists(userId:number, masterListId:number){
    this._listingService.GetListByMaster(userId,masterListId).subscribe((data:ListItem)=>{
      this.list=data;  
      console.log(this.list)
    })
  }
  Logout(){
    localStorage.clear();
    window.location.href='/login';
  }
  HomeRedirect(){
    window.location.href='/';
  }
}
