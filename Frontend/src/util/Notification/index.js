import { store as notificationStore } from "react-notifications-component";

export const notification = (title, message, type ,duration) => {
    return notificationStore.addNotification({
    title,
    message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration,
      onScreen: true,
    },
  })}