import httpStatus from "http-status";
import { AppError } from "../errors/appError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TuserRole } from "../modules/user/user.interfact";
import User from "../modules/user/user.model";

const authorize = (...roles: TuserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
    }
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    const { userId, role, iat } = decoded;
    const user = await User.findOne({ id: userId, role }).select("+password");
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
      const passwordChangedAt =
        new Date(user.passwordChangedAt).getTime() / 1000;
      if (passwordChangedAt > iat) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
      }
    }

    if (roles && !roles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
    }
    req.decoded = decoded as JwtPayload;
    next();
  });
};

export default authorize;
