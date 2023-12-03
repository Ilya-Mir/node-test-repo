import mongoose from "mongoose";

export const healthCheckHandler = async (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;

  if (isConnected) {
    res.status(200).json({
      status: "OK",
      message: "Healthy",
      db: "Connected",
    });
  } else {
    res.status(500).json({
      status: "Error",
      message: "Unhealthy",
      db: "Not connected",
    });
  }
};
