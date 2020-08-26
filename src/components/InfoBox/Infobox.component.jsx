import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({
  title,
  cases,
  total,
  active,
  isCase,
  isRecovered,
  isDeath,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isCase && "infoBox--case"
      } ${isRecovered && "infoBox--recovered"} ${isDeath && "infoBox--death"} `}
    >
      <CardContent>
        <div className="infoBox__title">{title}</div>

        <h2>{cases}</h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
