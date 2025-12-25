yarn run v1.22.22
$ tsx src/test.ts
Found used $ref: #/components/schemas/User
Found used $ref: #/components/schemas/User
Found used $ref: #/components/schemas/User
Found used $ref: #/components/schemas/User
Found used $ref: #/components/schemas/User
export interface paths {
    "/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create user.
         * @description This can only be done by the logged in user.
         */
        post: operations["createUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Order: {
            /**
             * Format: int64
             * @example 10
             */
            id?: number;
            /**
             * Format: int64
             * @example 198772
             */
            petId?: number;
            /**
             * Format: int32
             * @example 7
             */
            quantity?: number;
            /** Format: date-time */
            shipDate?: string;
            /**
             * @description Order Status
             * @example approved
             * @enum {string}
             */
            status?: "placed" | "approved" | "delivered";
            complete?: boolean;
        };
        Category: {
            /**
             * Format: int64
             * @example 1
             */
            id?: number;
            /** @example Dogs */
            name?: string;
        };
        User: {
            /**
             * Format: int64
             * @example 10
             */
            id?: number;
            /** @example theUser */
            username?: string;
            /** @example John */
            firstName?: string;
            /** @example James */
            lastName?: string;
            /** @example john@email.com */
            email?: string;
            /** @example 12345 */
            password?: string;
            /** @example 12345 */
            phone?: string;
            /**
             * Format: int32
             * @description User Status
             * @example 1
             */
            userStatus?: number;
        };
        Tag: {
            /** Format: int64 */
            id?: number;
            name?: string;
        };
        Pet: {
            /**
             * Format: int64
             * @example 10
             */
            id?: number;
            /** @example doggie */
            name: string;
            category?: components["schemas"]["Category"];
            photoUrls: string[];
            tags?: components["schemas"]["Tag"][];
            /**
             * @description pet status in the store
             * @enum {string}
             */
            status?: "available" | "pending" | "sold";
        };
        ApiResponse: {
            /** Format: int32 */
            code?: number;
            type?: string;
            message?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: {
        /** @description Pet object that needs to be added to the store */
        Pet: {
            content: {
                "application/json": components["schemas"]["Pet"];
                "application/xml": components["schemas"]["Pet"];
            };
        };
        /** @description List of user object */
        UserArray: {
            content: {
                "application/json": components["schemas"]["User"][];
            };
        };
    };
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    createUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Created user object */
        requestBody?: {
            content: {
                "application/json": components["schemas"]["User"];
                "application/xml": components["schemas"]["User"];
                "application/x-www-form-urlencoded": components["schemas"]["User"];
            };
        };
        responses: {
            /** @description successful operation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                    "application/xml": components["schemas"]["User"];
                };
            };
            /** @description Unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}

Done in 0.88s.
