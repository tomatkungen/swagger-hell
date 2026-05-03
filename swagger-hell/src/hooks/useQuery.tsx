import { sendToNode } from "../utils/send-to-node";
import { getSwaggerNamesOperator } from "../operators/get-swagger-names-operator";
import { getSwaggerEndpointsByNameOperator } from "../operators/get-swagger-endpoints-by-name-operator";

export const useQuery = () => {
    const getSwaggerNames = async (): Promise<void> => {
        await sendToNode(
            'GetSwaggerNames',
            getSwaggerNamesOperator
        )
    }

    const getSwaggerEndpointsByName = async (name: string): Promise<void> => {
        await sendToNode(
            'GetSwaggerEndpointsByName',
            getSwaggerEndpointsByNameOperator,
            { filename: name }
        )
    }

    return {
        getSwaggerNames,
        getSwaggerEndpointsByName
    }
}