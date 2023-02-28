import React from "react";
import { UserSettings } from "../../../helpers/settings";
import MassReportForm from "../massReportForm/MassReportForm";
import './MassReportPage.css';

export default function MassReportPage(props) {

  const categories = UserSettings.retrieveExpenseCategories();
  const [isLoading, setLoading] = React.useState(false);

  const submitReport = (transactions) => {
    console.log("submit these: ", transactions);
  }

  function renderBody() {
    if (isLoading === true) {
      return (
        <h2>Loading...</h2>
      );
    }
    return (
      <MassReportForm handleSubmit={submitReport}/>
    );
  }

  return (
    <div className="section-wrapper">
      <h1>Mass Report</h1>
      <p className="centered">This page is for quickly creating many reports, possibly across different dates.</p>
      {renderBody()}
    </div>
  );
}