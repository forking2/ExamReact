'use client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {FC, PropsWithChildren} from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1800000,
            retry: 2,
            refetchInterval: 1800000,
        }
    }
})

const ReactQueryProvider: FC<PropsWithChildren> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
