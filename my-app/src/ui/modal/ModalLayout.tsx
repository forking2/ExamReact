import type {CSSProperties, FC, PropsWithChildren} from "react";
import type {ModalProps} from "@/hooks/useModal.tsx";
import Portal from "@/common/portal.tsx";
import {cn} from "@/utils/cn.ts";

interface ModalLayoutProps extends PropsWithChildren<ModalProps> {
    className?: string
    style?: CSSProperties
}

const ModalLayout: FC<ModalLayoutProps> = (
    {
    onClose,
    open,
    animation,
    children,
    className,
    style
}) => {
    if(!open) return null;
    return (
        <Portal target={'modals-root'}>
            <div
                style={{...(style || {})}}
                onClick={e => {
                    e.stopPropagation()
                    onClose()
                }}
                className={cn(
                    "h-dvh overscroll-none z-[70] top-0 left-0 w-full bg-react/500 bg-opacity-80 duration-0 justify-center items-center fixed",
                    animation === "out" ? 'animate-fade-out' : 'animate-fade-in'
                )}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={cn('w-full h-1/2 min-h-[200px] overflow-y-auto max-h-dvh', className)}
                >
                    {children}
                </div>
            </div>
        </Portal>
    )
}

export default ModalLayout;