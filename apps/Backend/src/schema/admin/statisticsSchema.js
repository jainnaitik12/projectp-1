import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const PlacementAnalyticsSchema = new Schema(
  {
    academicYear: { type: String, required: true },
    highestCTC: Number,
    lpaWiseStats: [
      {
        lpa: { type: Number },
        numberofStudents: { type: Number },
      }
    ],
    companyWiseStats: [
      {
        company: String,
        studentsHired: Number,
        averagePackage: Number,
        roles: [String],
      },
    ],
    departmentWiseStats: [
      {
        department: String,
        totalStudents: Number,
        placedStudents: Number,
        averagePackage: Number,
      },
    ],
  },
  { timestamps: true }
);
export const PlacementAnalytics = mongoose.model(
  "PlacementAnalytics",
  PlacementAnalyticsSchema
);
const PlacementAnalytics = model('PlacementAnalytics', PlacementAnalyticsSchema);

export default PlacementAnalytics;