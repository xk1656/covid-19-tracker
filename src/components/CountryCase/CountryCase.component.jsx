import React from "react";
import numeral from "numeral";
import "./CountryCase.css";
import LineGraph from "../LineGraph/LineGraph.component";
import { Card, CardContent } from "@material-ui/core";

const CountryCase = ({ casesType, countries }) => {
  return (
    <div className="countryCase">
      <Card>
        <CardContent>
          <h2>Live Cases by Country</h2>
          <div className="table">
            {countries.map((country) => (
              <div key={country.country} className="tr">
                <div className="td">
                  <img src={`${country.countryInfo.flag}`} alt="" />
                  {country.country}
                </div>
                <div className="td">
                  <strong>{numeral(country.cases).format("0,0")}</strong>
                </div>
              </div>
            ))}
          </div>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CountryCase;
