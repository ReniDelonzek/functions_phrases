import { HasuraClientApi } from "../../infrastructure/data/HasuraClientApi";
import { HasuraDataSourceImpl } from "../../infrastructure/datasorces/HasuraDataSource";
import { AuthService } from "../../infrastructure/secutiry/AuthServiceImpl"; 

export async function updateTokenUseCase(token: string): Promise<boolean> {
    const authService = new AuthService();
    const uid = await authService.getUidByToken(token);
    if (uid) {
        if (await authService.updateCustomClaims(uid)) {
            const clientApi = new HasuraClientApi(new HasuraDataSourceImpl());
            return clientApi.insertNewUser((await authService.getEmailById(uid))!, uid);
        }
    }
    return false;
}