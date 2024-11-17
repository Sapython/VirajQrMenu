import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider } from '../providers/data.provider';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private databaseService:DatabaseService, private router:Router,public dataProvider:DataProvider) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any)=>{
      console.log(params);
      this.dataProvider.currentProjectId = params.project
      this.activatedRoute.queryParams.subscribe((queryParams:any)=>{
        this.databaseService.getQrSettings(params.project).then((data:any)=>{
          console.log("DB Data: ",data.data());
          this.dataProvider.qrSettings = {...data.data(),tableNo:queryParams.table};
          this.databaseService.getProducts(params.project).then((docs:any) => {
            this.dataProvider.dbProducts = docs;
            this.dataProvider.currentTable = queryParams.table;
            this.router.navigate([params.project,'menu'],{queryParams:{table:queryParams.table}});
          })
        })
      })
    })
  }

}
