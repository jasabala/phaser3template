declare type ParsedUrl = {
    source: string;
    protocol: string;
    authority: string;
    userInfo: string;
    user: string;
    password: string;
    host: string;
    port: string;
    relative: string;
    path: string;
    directory: string;
    file: string;
    query: string;
    anchor: string;
    pathNames: Array<string>;
    queryKey: Record<string, string>;
    id: string;
    href: string;
};
/**
 * URL parser.
 *
 * @param uri - url
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
export declare function url(uri: string | ParsedUrl, loc?: Location): ParsedUrl;
export {};
