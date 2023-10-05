export interface Bill{
    id:number;
    apartmentId:number;
    amount:number;
    type:string;
    billDate:Date;
    editMode:boolean;
}