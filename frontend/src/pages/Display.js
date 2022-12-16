import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate  } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Display() {
  // nav set for page change
  const nav = useNavigate();

  // useState for database data to be stored
  const [apiData, setApiData] = useState(null);

  // useEffect to fetch data from backend only once on load
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('/Users/', { mode: 'cors' });
      const json = await response.json();

      if (response.ok) {
        setApiData(json);
      }
    }

    fetchData();
  }, []);

  //Column names for grid
  const [columnDefs] = useState([
      { field: 'lastName' },
      { field: 'firstName' },
      { field: 'DoB', headerName: "DoB" },
      { field: 'address1' },
      { field: 'address2' },
      { field: 'city' },
      { field: 'postalCode' },
      { field: 'country' },
      { field: 'phone' },
      { field: 'email' },
      { field: 'notes' },
  ])

  //default row data
  const defaultColDef = useMemo( ()=> ({
    flex: 1,
    resizable: true,
    filter: true,
    sortable: true
  }), []);

  //Get row id and goto edit page on click
  const getId = useCallback( params => {
    nav('/' + params.data._id);
  });

  //JSX
  return (
    <>
      <h1>Display Users</h1>
      <p>Click on a user to edit or delete!</p>
      <br/>
      <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
           <AgGridReact
              onRowClicked={getId}
              rowData={apiData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}>
           </AgGridReact>
       </div>
    </>
  )
};

export default Display;