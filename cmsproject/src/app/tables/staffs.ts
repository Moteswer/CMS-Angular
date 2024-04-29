export class Staffs {
        staff_id:number ;
        first_name: string;
        last_name: string;
        password: string;
        email: string;
        phone_number:number ;
        date_of_birth: string;
        address: string;
        qualification: string;
        joining_date: string;
        gender: string;
        is_active:boolean;
        role:{
            role_id:number;
            name:string;
        }
        role_detail:{
            role_id:number;
            name:string;

        }
}
