import {useQuery} from "@tanstack/react-query";
import {AuthService} from "@/screens/auth/services/auth.service.ts";
import type {IUserProfile} from "@/screens/auth/types/User.ts";

export const useAuthQuery = () => {
    const session = AuthService.getStoredSession();

    return useQuery({
        queryKey: ["auth", "current-user"],
        queryFn: () => AuthService.getCurrentUser(),
        enabled: Boolean(session?.access_token),
    });
};

export const useUsersQuery = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () =>
            AuthService.getAllProfiles()
                .then(resp => resp.data as Array<IUserProfile>),
    });
};
