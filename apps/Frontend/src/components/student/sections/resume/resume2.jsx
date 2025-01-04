// import React, { useState } from "react";
// import {
//   Container,
//   Paper,
//   Typography,
//   Button,
//   Grid,
//   useTheme,
//   Box,
//   useMediaQuery,
//   Alert,
// } from "@mui/material";
// import { Preview } from "@mui/icons-material";
// import { templates } from "./utils/templates";
// import { TemplateSelector } from "./components/TemplateSelector";
// import { PreviewDialog } from "./components/PreviewDialog";
// import { ErrorBoundary } from "./components/ErrorBoundary";

// const ResumeBuilder = ({ profile }) => {
//   const theme = useTheme();
//   const [selectedTemplate, setSelectedTemplate] = useState("modern");
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [zoom, setZoom] = useState(100);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const SelectedTemplate = templates[selectedTemplate].component;
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <ErrorBoundary>
//       <Container maxWidth="lg">
//         <Paper sx={{ p: 3, mt: 4, mb: 4 }}>
//           <Typography variant="h5" gutterBottom>
//             Resume Builder
//           </Typography>

//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Select Template:
//               </Typography>
//               <TemplateSelector
//                 selectedTemplate={selectedTemplate}
//                 onTemplateSelect={setSelectedTemplate}
//                 theme={theme}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
//                 <Button
//                   variant="outlined"
//                   startIcon={<Preview />}
//                   onClick={() => setPreviewOpen(true)}
//                 >
//                   Preview & Download
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>

//         <PreviewDialog
//           open={previewOpen}
//           onClose={() => setPreviewOpen(false)}
//           zoom={zoom}
//           onZoomChange={setZoom}
//           isGenerating={isGenerating}
//           setIsGenerating={setIsGenerating}
//           profile={profile}
//           SelectedTemplate={SelectedTemplate}
//           fullScreen={isSmallScreen}
//         />
//       </Container>
//     </ErrorBoundary>
//   );
// };

// export default ResumeBuilder;
