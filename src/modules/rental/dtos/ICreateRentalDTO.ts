interface ICreateRentalDTO {
  id?: string;
  propertyId: string;
  userId: string;
  totalRate?: number;
  startDate: Date; 
  expected_return_date: Date;
  endDate?: Date;
}

export { ICreateRentalDTO }