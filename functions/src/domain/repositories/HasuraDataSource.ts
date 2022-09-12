export abstract class HasuraDataSource {
    abstract executeQuery(query: string, args: any): Promise<any>;
    
    abstract executeMutation(mutation: string, args: any): Promise<any>;
}