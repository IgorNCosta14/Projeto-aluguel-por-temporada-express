interface ICreateRentalDTO {
  id?: string;
  propertyId: string;
  userId: string;
  totalRate?: number;
  totalLateFee?: number;
  startDate?: Date; 
  expectedReturnDate: Date;
  expectedTotalRate?: number;
  endDate?: Date;
}

export { ICreateRentalDTO }