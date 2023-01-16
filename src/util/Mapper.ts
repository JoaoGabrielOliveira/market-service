export function MapperArrayTo<T extends object>(targetType : {new() : T}, originsData : any[]) : T[] {
    return originsData.map(originData => {
        return MapperTo<T>(targetType, originData)
    });
}

export function MapperTo<T extends object>(targetType : {new() : T}, originData : any) : T {
    let properties = Object.getOwnPropertyNames(new targetType);
    return MapperToProperties<T>(properties, originData, targetType);
}

export function MapperToProperties<T extends object>(properties : string[], originData : T, constructor : {new() : T}) {
    let mappedData : T = new constructor;
    properties.forEach(property => {
        mappedData[property] = originData[property];
    });

    return mappedData;
}