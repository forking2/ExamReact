import type {ILoginUser, IUser} from "@/screens/auth/types/User.ts";
import {useNavigate} from "react-router";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RouterEnum} from "@/config/RouterEnum.ts";
import {AuthService} from "@/screens/auth/services/auth.service.ts";

export const useAuthMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["register"],
        mutationFn: (props: {data: IUser}) => AuthService.signUp(props),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["auth"]});
            await queryClient.invalidateQueries({queryKey: ["users"]});
            navigate(RouterEnum.MAIN);
        },
    });
};

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["login"],
        mutationFn: (props: {data: ILoginUser}) => AuthService.signIn(props),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["auth"]});
            navigate(RouterEnum.MAIN);
        },
    });
};

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: () => AuthService.signOut(),
        onSuccess: async () => {
            await queryClient.resetQueries({queryKey: ["auth"]});
            navigate(RouterEnum.LOGIN);
        },
    });
};
