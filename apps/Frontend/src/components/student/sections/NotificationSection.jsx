import React from "react";
import { motion } from "framer-motion";
import {
  NotificationsActive,
  Work,
  School,
  Event,
  Info,
} from "@mui/icons-material";

const NotificationsSection = ({ notifications = dummyNotifications }) => {
  const getIcon = (type) => {
    switch (type) {
      case "job":
        return <Work className="text-blue-500" />;
      case "academic":
        return <School className="text-green-500" />;
      case "event":
        return <Event className="text-purple-500" />;
      default:
        return <Info className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NotificationsActive className="text-blue-600" />
            <h3 className="text-xl font-semibold">Notifications</h3>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {notifications.length} New
          </span>
        </div>

        <div className="p-6 space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <motion.div
                key={notification._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.isRead ? "bg-gray-50" : "bg-blue-50"
                } ${getBorderColor(notification.type)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <time>{formatDate(notification.date)}</time>
                      {!notification.isRead && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No notifications to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getBorderColor = (type) => {
  switch (type) {
    case "job":
      return "border-blue-500";
    case "academic":
      return "border-green-500";
    case "event":
      return "border-purple-500";
    default:
      return "border-gray-300";
  }
};

const formatDate = (date) => {
  const options = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

// Dummy data for testing
const dummyNotifications = [
  {
    _id: "1",
    type: "job",
    title: "New Job Opening",
    message:
      "Google has posted a new Software Engineer position. Apply before the deadline!",
    date: new Date(),
    isRead: false,
  },
  {
    _id: "2",
    type: "academic",
    title: "Profile Update Required",
    message:
      "Please update your academic scores in your profile before the placement season begins.",
    date: new Date(Date.now() - 86400000), // 1 day ago
    isRead: true,
  },
  {
    _id: "3",
    type: "event",
    title: "Upcoming Workshop",
    message:
      "Register for the upcoming resume building workshop scheduled for next week.",
    date: new Date(Date.now() - 172800000), // 2 days ago
    isRead: false,
  },
  {
    _id: "4",
    type: "job",
    title: "Application Status Update",
    message:
      "Your application for Microsoft has been shortlisted for the next round.",
    date: new Date(Date.now() - 259200000), // 3 days ago
    isRead: true,
  },
];

export default NotificationsSection;
