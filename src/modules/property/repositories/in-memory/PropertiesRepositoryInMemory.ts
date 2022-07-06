import { ICreatePropertyDTO } from "@modules/property/dtos/ICreatePropertyDTO";
import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IPropertiesRepository } from "../IPropertiesRepository";

class PropertiesRepositoryInMemory implements IPropertiesRepository{
    properties: Property[] = []

    async create({
        propertyName,
        description,
        propertyOwner,
        propertyAddressId,
        propertyNumber,
        typeProperty,
        dailyRate,
        lateFee
    }: ICreatePropertyDTO): Promise<Property> {
        const property = new Property();

        Object.assign(property, {
            propertyName,
            description,
            propertyOwner,
            propertyAddressId,
            propertyNumber,
            typeProperty,
            dailyRate,
            createdAt: new Date(),
            updatedAt: new Date(),
            lateFee
        })

        this.properties.push(property);

        return property;
    }

    async delete(id: string): Promise<void> {
        const propertyIndex = this.properties.findIndex((property) => property.id === id);

        this.properties.slice(propertyIndex, 1);
    }

    async listAvailableProperty(): Promise<Property[]> {
        const properties = this.properties.filter((property) => property.available === true);

        return properties;
    }

    async updateAvailableState(id: string, available: boolean): Promise<void> {
        const property = this.properties.find((property) => property.id === id);

        property.available = available;

        this.properties.push(property)
    }

    async findById(id: string): Promise<Property> {
        const property = this.properties.find((property) => property.id === id);

        return property;
    }

    async findPropertyByAddressId(propertyAddressId: number): Promise<Property[]> {
        const properties = this.properties.filter((property) => property.propertyAddressId === propertyAddressId);

        return properties;
    }

    async findByTypeProperty(typeProperty: string): Promise<Property[]> {
        const properties = this.properties.filter((property) => property.typeProperty === typeProperty);

        return properties;
    }

    async findPropertyByOwner(propertyOwner: string): Promise<Property[]> {
        const properties = this.properties.filter((property) => property.propertyOwner === propertyOwner);

        return properties;
    }

}

export { PropertiesRepositoryInMemory }