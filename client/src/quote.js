import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Moment from 'moment';
import { Line } from "react-chartjs-2";



var dateIniVal;

var url = window.location.href;
url = url + "";
var id = "";
if (url !== "http://localhost:3000/") {
  id = url.split("quote/");
}


id = id[1];
var value = [];
if (id !== undefined) {
  value = id.split("&");
}

let dateValue= new Date();

if (value[1]!==undefined) {
  dateValue = value[1];
}else{
  dateValue=Moment(new Date()).format("YYYY-MM-DD");
}



let symbol;

if (value[0]!==undefined) {
  symbol = value[0];
} else {
  symbol = "DOCU";
  dateIniVal = symbol + "&" + Moment(new Date()).format("YYYY-MM-DD");
}


let newUrl =
  "https://financialmodelingprep.com/api/v3/historical-price-full/z?to=x&apikey=30a8a9f19dd994a7d0a124320dd8e1d2";


if (dateValue !== undefined && symbol !== undefined) {
  var newText = newUrl.replace(/[z]/g, symbol);
  newText = newText.replace(/[x]/g, dateValue);
  newUrl = new URL(newText);

} else {
  id = "DOCU";
  newText = newUrl.replace(/[z]/g, id);
  newText = newText.replace(/[x]/g, dateValue);
  newUrl = new URL(newText);
}

console.log("Url is",newUrl);


const Quote = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rowData, setRowData] = useState();

  const handleSelectedDate = (date) => {

    const dateNow = Moment(date).format("YYYY-MM-DD");
    dateIniVal = dateNow;
    dateIniVal = symbol + "&" + dateIniVal;
    setSelectedDate(date);
  };




  const columns = [
    { headerName: "Date", field: "date" },
    { headerName: "Open", field: "open" },
    { headerName: "High", field: "high" },
    { headerName: "Low", field: "low" },
    { headerName: "Close", field: "close" },
  ];

  useEffect(() => {
    fetch(newUrl)
      .then((res) => res.json())
      .then((data) => data.historical)
      .then((historical) =>
        historical.map((history) => {
          return {
            symbol: history.symbol,
            date: history.date,
            open: history.open,
            high: history.high,
            low: history.low,
            close: history.close,
          };
        })
      )
      .then((histories) => setRowData(histories));
  }, []);

  let stock_price = [];
  let date = [];
  for (var i in rowData) {
    stock_price[i] = rowData[i].close;
    date[i] = rowData[i].date;
  }

  const defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };


  return (
    <div className="container">
      <h2 style={{ padding: "15px", fontFamily: "arial" }}>Data Collection for {symbol}</h2>


      <div style={{ padding: '20px'
    
    }}>
        <div>
          <label></label>
          <DatePicker

            selected={selectedDate}
            maxDate={new Date()}
            onChange={handleSelectedDate}

          />

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "http://localhost:3000/quote/" + dateIniVal;
            }}
          > Search</button>
        </div>

      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100%", fontSize: "18px" }}
      >
        <div>
          <Line
        data={{
          labels: date,
          datasets: [
            {
              label: "Stock Graph Data",
              data: stock_price,
            },
          ],
        }}
        height={400}
        width={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        }}
      />
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100%", fontSize: "18px" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          enableBrowserTooltips={true}
          pagination={true}
        />
      </div>
    </div>
    </div>
  );
};



export default Quote;