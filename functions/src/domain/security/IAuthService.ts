export abstract class IAuhtService {
    abstract updateCustomClaims(uid: string): Promise<boolean>;

    abstract getUidByToken(token: string): Promise<string | null>;
}