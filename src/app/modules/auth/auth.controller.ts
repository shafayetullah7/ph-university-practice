import httpStatus from "http-status";
import { AppError } from "../../errors/appError";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.services";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const { accessToken, refreshToken, needsPasswordChange, user } =
    await authServices.loginUserIntoDB(payload);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to login");
  }
  res.cookie("refreshToken", refreshToken, {
    httpOnly: config.NODE_ENV === "production",
  });
  return res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in",
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { userId, role } = req.decoded;
  const updatedUser = await authServices.changePsswordIntoDB(
    userId,
    role,
    oldPassword,
    newPassword
  );
  if (!updatedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to login");
  }
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Password changed successfully",
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  return res.status(httpStatus.OK).json({
    success: true,
    message: "New access token created",
    result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
};
