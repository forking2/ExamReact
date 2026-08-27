import toast from "react-hot-toast";
export const tostik = {
    success: (message: string) => {
        toast(message, {
            style: {
                borderRadius: '10px',
                background: '#246300',
                color: '#fff',
            }
        })
    },
    error: (message: string) => {
        toast(message, {
            style: {
                borderRadius: '10px',
                background: '#ff1616',
                color: '#fff',
            }
        })
    }
}
