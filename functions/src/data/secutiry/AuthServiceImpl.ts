import { IAuhtService } from "../../domain/security/IAuthService";
import { auth } from "firebase-admin";
import { logger } from "firebase-functions";

export class AuthService implements IAuhtService {

    /// Retorna os claims necessários para funcionar com o hasura
    private getClainsHasura(uid: string) {
        return {
            "https://hasura.io/jwt/claims": {
                "x-hasura-default-role": "user",
                "x-hasura-allowed-roles": ["user"],
                "x-hasura-user-id": uid
            }
        };
    }

    async updateCustomClaims(uid: string): Promise<boolean> {
        try {
            await auth()
                .setCustomUserClaims(uid, this.getClainsHasura(uid))
            return true;
        } catch (error) {
            logger.error(error);
        }
        return false;
    }

    async getUidByToken(token: string): Promise<string | null> {
        try {
            const decoded = await auth().verifyIdToken(token, true);
            return decoded.uid
        } catch (error) {
            logger.error(error);
        }
        return null;
    }
}