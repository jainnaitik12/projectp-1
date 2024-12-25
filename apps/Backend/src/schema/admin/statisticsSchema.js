import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const PlacementAnalyticsSchema = new Schema(
  {
    academicYear: { type: String, required: true },
    totalStudents: Number,
    placedStudents: Number,
    averageCTC: Number,
    highestCTC: Number,
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
  placementAnalyticsSchema
);
const PlacementAnalytics = model('PlacementAnalytics', PlacementAnalyticsSchema);

export default PlacementAnalytics;