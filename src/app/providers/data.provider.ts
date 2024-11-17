import { Injectable } from '@angular/core';
import { PageSetting } from '../structures/method.structure';
import { UserData } from '../structures/user.structure';

@Injectable()
export class DataProvider{
    public data:any;
    public pageSetting:PageSetting={
        blur:false,
        lastRedirect:'',
        message:'',
        spinner:false,
        messageType:'Error'
    };
    public currentProjectId:string = '';
    public currentTable:string = '';
    public userData:UserData | undefined;
    public loggedIn:boolean = false;
    public gettingUserData:boolean = false;
    public userID:string = '';
    public ingredientsCopy:any;
    public verifyEmail:boolean = false;
    public reloadPage:boolean = false;
    public checkoutData:any;
    public shippingData:any;
    public cartTotal:any;
    public qrSettings:any;
    public cartProducts : any;
    public selectedDeliveryAddress:any;
    public checkoutType: 'product' | 'room' = 'product';
    public dataFour:any;
    public qrCustomerData:any;
    public qrProducts:any[] = [];
    public dbProducts:any[] = [];
    public tableNo:number = 0;
}
