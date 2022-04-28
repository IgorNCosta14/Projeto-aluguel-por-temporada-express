interface ICreateRentalDTO {
  id?: string;
  propertyId: string;
  userId: string;
  totalRate?: number;
  startDate?: Date; 
  expectedReturnDate: Date;
  endDate?: Date;
}

export { ICreateRentalDTO }