import mongoose from "mongoose";
import { Tcourse, TpreRequisites } from "./course.interface";

const preRequisiteCourseSchema = new mongoose.Schema<TpreRequisites>({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new mongoose.Schema<Tcourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      min: 1,
    },
    preRequisiteCourses: {
      type: [preRequisiteCourseSchema],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model<Tcourse>("Course", courseSchema);
export default Course;
