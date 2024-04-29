export class Doctor {
    doctor_id: number;
    first_name: string;
    last_name: string;
    password:string;
    email: string;
    phone_number: number;
    date_of_birth: string;
    qualification:string;
    address: string;
    gender:string;
    date_joined: string; 
    is_active: boolean;
    consultation_fee:string;
    Duty_time: string;
    specialization: {
        id: number;
        specialization:string;
    };
    specialization_detail:{
        id: number;
        specialization:string;

    };
}
