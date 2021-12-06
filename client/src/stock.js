import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Moment from 'moment';
import './index.css';

var url = new URL('https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=30a8a9f19dd994a7d0a124320dd8e1d2');


const Stocks = () => {

  const [rowData, setRowData] = useState([]);

  const columns = [
    {
      headerName: "symbol",
      field: "symbol",
   
      cellRenderer: function (params) {

        let myData = params.data.symbol;
        let dateNow = Moment(new Date()).format("YYYY-MM-DD"); 
        
        let newLink = `<a href= http://localhost:3000/quote/${myData}&${dateNow} target="_blank"> ${myData}</a>`;
        return newLink;
      },
    },
    { headerName: "Name", field: "name" },
    { headerName: "Sector", field: "sector" },
    { headerName: "Date First Added", field: "dateFirstAdded" },
    

  ];


  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        data.map((stockval) => {
          return {
            symbol: stockval.symbol,
            name: stockval.name,
            sector: stockval.sector,
            dateFirstAdded: stockval.dateFirstAdded,
         
          };
        })
      )
      .then((books) => setRowData(books));
  }, []);

  const defaultColDef = {
    sortable: true, 
    editable: true, 
    filter: true,
    floatingFilter: true,
    flex: 1,
  };


  return (
 

    <div className="container">
      <div className="ag-theme-alpine" style={{ height: 500, width: 1625 }}>
        <AgGridReact
     

          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          enableBrowserTooltips={true}
          pagination={true}
          paginationPageSize={6}
        />
      </div>
    </div>
  );
};

export default Stocks;