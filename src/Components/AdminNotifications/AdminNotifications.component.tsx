import { FC, useEffect, useState } from "react";

//style
import {
  AdminNotificationsContentHolder,
  AdminNotifyContainer,
  CancelIcon,
  CancelIconHolder,
  CancelImage,
  DateAndPriorityContainer,
  DateTimeHolder,
  DivCardContentHolder,
  HrAdmin,
  Linked,
  NotificationCard,
  NotificationDateAndTime,
  NotificationInfo,
  NotificationMessage,
  NotificationText,
  NotificationType,
  PriorityLevel,
  TimeIcon,
  UserFirstName,
  UserInfoHolder,
  UserLastName,
} from "./style/AdminNotifications.style";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import {
  Notification,
  NotificationRead,
  deleteNotification,
  fetchAdminNotification,
} from "redux/Pages/AdminNotification/AdminNotificationSlice";

const AdminNotifications: FC<{}> = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const Cancel = require("./assets/cancel.png") as string;

  //get userId from redux
  const userId = useSelector((state: RootState) => state.login.user?.id);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchAdminNotification({ userId }))
        .then((result: any) => {
          if (fetchAdminNotification.fulfilled.match(result)) {
            setNotifications(result.payload as unknown as Notification[]);
          } else {
            console.error("Notification not found.");
          }
        })
        .catch((error: any) => {
          console.error("Error fetching notification:", error);
        });
    }
  }, [dispatch, userId]);
  console.log(notifications);

  //delete notification api call
  const handleDeleteNotification = async (notificationId: number) => {
    try {
      const result = await dispatch(deleteNotification(notificationId));
      if (deleteNotification.fulfilled.match(result)) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification?.id !== notificationId
          )
        );
        console.log("Notification deleted successfully!");
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  //read or unread api call
  const handleReadStatusChange = async (notificationId: number) => {
    try {
      const result = await dispatch(NotificationRead(notificationId));
      if (NotificationRead.fulfilled.match(result)) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) => {
            if (notification.id === notificationId) {
              return { ...notification, notificationRead: true };
            }
            return notification;
          })
        );
        console.log("Notification status updated successfully!");
      } else {
        console.error("Failed to update notification status");
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  return (
    <AdminNotifyContainer>
      <NotificationText>NOTIFICATIONS</NotificationText>
      <AdminNotificationsContentHolder>
        {notifications.map((nestedArray: any, index: any) => (
          <div key={index}>
            {nestedArray.map((notification: any, subIndex: any) => (
              <DivCardContentHolder
                key={subIndex}
                $isread={notification.notificationRead.toString()}
                onClick={() => handleReadStatusChange(notification.id)}
              >
                {notification.notificationRead}
                <NotificationCard>
                  <CancelIconHolder>
                    <CancelIcon
                      style={{ color: "#808080c2", cursor: "pointer" }}
                      onClick={() => handleDeleteNotification(notification.id)}
                    />
                    {/* <CancelImage src={Cancel} alt="cancel" /> */}
                  </CancelIconHolder>
                  <Linked to={`/adminMessage/${notification.id}`}>
                    <NotificationInfo>
                      <NotificationType
                        $notificationtype={notification.notificationType}
                      >
                        {notification.notificationType}
                      </NotificationType>
                      <NotificationMessage>
                        {notification.subject}
                      </NotificationMessage>
                      <UserInfoHolder>
                        <UserFirstName>
                          {notification.user.firstName}
                        </UserFirstName>
                        <UserLastName>
                          {notification.user.lastName}
                        </UserLastName>
                      </UserInfoHolder>
                    </NotificationInfo>
                  </Linked>
                  <DateAndPriorityContainer>
                    <DateTimeHolder>
                      <TimeIcon
                        style={{ fontSize: "20px", color: "#808080c2" }}
                      />
                      <NotificationDateAndTime>
                        {new Date(
                          notification.notificationDateTime
                        ).toLocaleString()}
                      </NotificationDateAndTime>
                    </DateTimeHolder>
                    <PriorityLevel $prioritylevel={notification.priorityLevel}>
                      {notification.priorityLevel}
                    </PriorityLevel>
                  </DateAndPriorityContainer>
                </NotificationCard>

                <HrAdmin />
              </DivCardContentHolder>
            ))}
          </div>
        ))}
      </AdminNotificationsContentHolder>
    </AdminNotifyContainer>
  );
};
export default AdminNotifications;
