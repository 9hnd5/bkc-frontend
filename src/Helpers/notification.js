import { toast, Zoom } from 'react-toastify';
export const NOTIFICATION_TYPE = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}
const options = {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom
}
export const notification = (notificationType, message) => {
    switch (notificationType) {
        case NOTIFICATION_TYPE.SUCCESS: {
            toast.success(message, options);
            break;
        }
        case NOTIFICATION_TYPE.ERROR: {
            toast.error(message, options);
            break;
        }
        default:
            break;
    }
}