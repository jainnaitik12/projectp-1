const placementAnalyticsSchema = new mongoose.Schema(
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
module.exports = PlacementAnalytics;
