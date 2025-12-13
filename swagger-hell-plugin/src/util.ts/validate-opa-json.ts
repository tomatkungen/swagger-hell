type OPAVersion = "3" | "2";

export const validateOpaJson = (json: any, opaVersion: OPAVersion): boolean => {
    if (!json)
        return false;
    
    switch (opaVersion) {
        case "3":
            return (json?.openapi ?? "").startsWith("3.") ? true : false;
        case "2":
            return (json?.swagger ?? "").startsWith("2.") ? true : false;
        default:
            return false;
    }
}