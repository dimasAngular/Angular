export interface Profile {
    set(res: Profile): void;
    me: Profile;
    id:number,
    username:string,
    avatarUrl:null,
    subscribersAmount:number,
    firstName:string,
    lastName:string,
    isActive:boolean,
    stack:string[],
    city:string,
    description:string,
}