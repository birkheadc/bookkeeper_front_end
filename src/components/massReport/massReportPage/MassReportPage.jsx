import React from "react";
import { UserSettings } from "../../../helpers/settings";
import MassReportForm from "../massReportForm/MassReportForm";
import './MassReportPage.css';
import { Api } from "../../../api";

export default function MassReportPage(props) {

  const categories = UserSettings.retrieveExpenseCategories();
  const [message, setMessage] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const submitReport = async (transactions) => {
    setLoading(true);
    const status = await Api.postMassReport(transactions, []);
    setMessage(status ? "Successfully uploaded reports." : "Failed to upload reports.");
    setLoading(false);
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
      <p className="centered">{message}</p>
      {renderBody()}
    </div>
  );
}