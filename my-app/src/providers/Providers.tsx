import type {FC, PropsWithChildren} from "react";
import ReactQueryProvider from "@/providers/ReactQueryProvider.tsx";
import ToastifyProvider from "@/providers/ToastifyProvider.tsx";
import I18nextProvider from "@/providers/I18nextProvider.tsx";
import {ThemeProvider} from "@/providers/ThemeContextProvider.tsx";

const Providers : FC<PropsWithChildren> = ({children}) => {
    return (
        <div>
            <ThemeProvider>
                <ReactQueryProvider>
                    <I18nextProvider>
                        <ToastifyProvider>
                            {children}
                        </ToastifyProvider>
                    </I18nextProvider>
                </ReactQueryProvider>
            </ThemeProvider>
        </div>
    );
};

export default Providers;