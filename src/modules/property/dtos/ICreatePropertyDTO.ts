interface ICreatePropertyDTO {
    id?: string;
    propertyName: string;
    description: string;
    zipCode: string;
    typeProperty: string;
    available?: boolean;
    dailyRate: number;
    createdAt?: Date;
  }
  
  export { ICreatePropertyDTO }