interface ErrorWithCause extends Error {
    cause: Error;
}
export declare class ConfigurationError extends Error {
}
export declare class LoaderError extends Error {
}
export declare const isKnownError: (error: Error) => boolean;
export declare const hasCause: (error: Error) => error is ErrorWithCause;
export declare const isConfigurationError: (error: Error) => boolean;
export declare const getKnownError: (error: Error) => Error;
export {};
