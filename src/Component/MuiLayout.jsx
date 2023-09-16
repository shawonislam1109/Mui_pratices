import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";

const MuiLayout = () => {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (newExpanded, panel) => {
    setExpanded(newExpanded ? panel : false);
  };

  const Accroddian = styled("div")(({ theme }) => ({
    height: "100%",
    "&:hover": {
      background: "primary.main",
    },
    marginTop: "3rem",
    marginBottom: "3rem",
  }));

  return (
    <Stack spacing={3}>
      <Paper
        sx={{
          padding: "1rem",
          bgcolor: "transparent",
          margin: "10px",
        }}
        elevation={4}
        square={false}
      >
        <Grid container spacing={3} mt="20px">
          <Grid item xs={8} md={4} lg={12}>
            <Box bgcolor="primary.main">item - 1</Box>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box bgcolor="primary.light">item - 2</Box>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box bgcolor="primary.main">item - 3</Box>
          </Grid>
          <Grid item xs={8} md={4}>
            <Box bgcolor="primary.light">item - 4</Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        sx={{
          padding: "1rem",
          bgcolor: "transparent",
          margin: "10px",
        }}
        elevation={4}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Paper>

      <Paper
        sx={{
          padding: "1rem",
          bgcolor: "transparent",
          margin: "10px",
        }}
        elevation={4}
      >
        <Accroddian>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={(event, isExpanded) => handleChange(isExpanded, "panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
            >
              <Typography>Collapsible Group Item #1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={(event, isExpanded) => handleChange(isExpanded, "panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
              expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
            >
              <Typography>Collapsible Group Item #2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={(event, isExpanded) => handleChange(isExpanded, "panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
              expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
            >
              <Typography>Collapsible Group Item #3</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Accroddian>
      </Paper>
    </Stack>
  );
};

export default MuiLayout;
