interface ICreatePropertyDTO {
    id?: string;
    propertyName: string;
    description: string;
    cep: string;
    type_of_property: string;
    available?: boolean;
    daily_rate: number;
    created_at?: Date;
  }
  
  export { ICreatePropertyDTO }