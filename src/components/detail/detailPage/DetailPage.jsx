import React, { useState } from "react";
import { Api } from "../../../api";
import DetailDisplay from "../detailDisplay/DetailDisplay";
import DetailPageDateSelector from "../detailPageDateSelector/DetailPageDateSelector";
import './DetailPage.css';

function DetailPage(props) {

  const [isLoading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const changeDates = async (from, to) => {
    setLoading(true);
    const report = await Api.fetchReports(from, to);
    setReport(report);

    setLoading(false);
  }

  function renderDisplay() {
    if (isLoading === true) {
      return (
        <h2>Loading...</h2>
      );
    }
    return (
      <DetailDisplay report={report} />
    );
  }

  return (
    <div className='section-wrapper'>
      <h1>Detail</h1>
      {renderDisplay()}
      <DetailPageDateSelector handleChangeDates={changeDates}/>
    </div>
  );
}

export default DetailPage;