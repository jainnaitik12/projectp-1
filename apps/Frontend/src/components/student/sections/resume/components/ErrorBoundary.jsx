import React from "react";
import { Alert, Button, Box } from "@mui/material";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            }
          >
            Something went wrong rendering the resume. Please try again.
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
