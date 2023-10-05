export interface Apartment {
    id:number;
    block:string;
    type:string;
    isOccupied:boolean;
    floor:number;
    apartmentNumber:number;
    ownerOrTenant:number;
    customerId:number;
    editMode:boolean;
}