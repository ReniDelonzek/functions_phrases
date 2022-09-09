import { AuthService } from "../../data/secutiry/AuthServiceImpl";

export async function updateTokenUseCase(token: string): Promise<boolean> {
    const authService = new AuthService();
    const uid = await authService.getUidByToken(token);
    if (uid) {
        return await authService.updateCustomClaims(uid);
    }
    return false;
}