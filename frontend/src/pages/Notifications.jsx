import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import api from "../services/api";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        api.get("/notifications")
            .then((response) => {
                setNotifications(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const markAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);

            setNotifications(
                notifications.map((notification) =>
                    notification.id === id
                        ? { ...notification, read_at: new Date() }
                        : notification
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <Bell size={28} />
                <h1 className="text-2xl font-bold">
                    Notifications
                </h1>
            </div>

            {notifications.length === 0 ? (
                <p className="text-gray-500">
                    Aucune notification.
                </p>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`p-4 rounded-xl border cursor-pointer ${
                                notification.read_at
                                    ? "bg-white"
                                    : "bg-pink-50"
                            }`}
                        >
                            <p>
                                {notification.data.message}
                            </p>

                            {!notification.read_at && (
                                <span className="text-sm text-pink-600">
                                    Nouvelle
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notifications;