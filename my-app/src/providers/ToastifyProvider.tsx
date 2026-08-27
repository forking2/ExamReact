import type {FC, PropsWithChildren} from "react";
import { Toaster } from 'react-hot-toast';

const ToastifyProvider: FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <Toaster toastOptions={{
            }} position={'top-right'}/>
            {children}
        </>
    );
};

export default ToastifyProvider;