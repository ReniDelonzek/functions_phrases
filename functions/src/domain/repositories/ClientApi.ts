export abstract class ClientApi {
    abstract insertNewUser(email: string, password: string): Promise<boolean>;
}