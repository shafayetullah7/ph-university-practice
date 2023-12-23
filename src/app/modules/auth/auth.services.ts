import httpStatus from "http-status";
import { AppError } from "../../errors/appError";
import User from "../user/user.model";
import { TauthUser } from "./auth.interfact";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUserIntoDB = async (payload: TauthUser) => {
  const user = await User.findOne({ id: payload.id }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  //   console.log(user);
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  if (!(await User.passwordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Wrong user password");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
    user,
  };
};

const changePsswordIntoDB = async (
  userId: string,
  role: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await User.findOne({ id: userId, role }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  //   console.log(user);
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  if (!(await User.passwordMatched(oldPassword, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, "Wrong user password");
  }

  newPassword = await bcrypt.hash(newPassword, Number(config.bcryptSaltRounds));
  const updatedUser = await User.findOneAndUpdate(
    { id: userId, role },
    {
      $set: {
        password: newPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
      },
    }
  );
  return updatedUser;
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.JWT_REFRESH_SECRET as string
  ) as JwtPayload;

  const { userId, role, iat } = decoded;
  const user = await User.findOne({ id: userId, role });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }
  if (user.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }
  if (iat && user.passwordChangedAt) {
    const passwordChangedAt = new Date(user.passwordChangedAt).getTime() / 1000;
    if (passwordChangedAt > iat) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
    }
  }
  const accessToken = createToken(
    { userId: user.id, role: user.role },
    config.JWT_ACCESS_SECRET as string,
    config.jwt_access_expires_in as string
  );
  return { accessToken };
};

export const authServices = {
  loginUserIntoDB,
  changePsswordIntoDB,
  refreshToken
};
