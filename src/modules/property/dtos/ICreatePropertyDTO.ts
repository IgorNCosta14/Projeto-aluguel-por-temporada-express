interface ICreatePropertyDTO {
    id?: string;
    propertyName: string;
    description: string;
    propertyOwner?: string;
    zipCode: string;
    typeProperty: string;
    available?: boolean;
    dailyRate: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export { ICreatePropertyDTO }