// obj is Object and string ref #/components/schemas/User -> components.schemas.User
export const getObjectByRefs = <T = object>(obj: T, ref: string): object => {
    const refParts = ref.replace(/^#\//, '').split('/'); // Remove leading '#/' and split by '/'
    let current: any = obj;

    for (const part of refParts) {
        current = (
            current && typeof current === 'object' && part in current ?
                current[part] :
                null
        );
    }

    return current;
}