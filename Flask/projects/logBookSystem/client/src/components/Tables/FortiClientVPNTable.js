// FortiClientVPNTable.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DeleteModal from '../Modals/DeleteModal';

const FortiClientVPNTable = () => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterOwner, setFilterOwner] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleRowClick = (vpn_id) => {
    setSelectedId(vpn_id);
  };

  const handleRowClick2 = (row) => {
    setSelectedData(row);
  };
  
  const deleteFortiClient = async () => {
    try {
      const response = await fetch (`/delete-forticlient-data/${selectedId}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let url = '/get-all-forticlient-data';
      if (filterText) {
        url = `/search-forticlient-data?search=${filterText}`;
      }
  
      try {
        const response = await axios.get(url);
        const data = await response.data;
        setData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [filterText]);

  const columns = [
    { name: 'VPN ID', selector: 'vpn_id', sortable: true },
    { name: 'Company Name', selector: 'company_name', sortable: true },
    { name: 'Owner\'s Name', selector: 'owners_name', sortable: true },
    { name: 'Initial Phone', selector: 'initial_phone', sortable: true },
    { name: 'Current Phone', selector: 'current_phone', sortable: true },
    { name: 'Email', selector: 'email', sortable: true },
    { name: 'New Phone', selector: 'new_phone', sortable: true },
    { name: 'Date Requested', selector: 'date_requested', sortable: true },
    { name: 'Sign', selector: 'sign', sortable: true },
    { name: 'User ID', selector: 'user_id', sortable: true },
  ];

  const filteredData = data.filter(item => 
    (filterText === '' || (item.company_name && item.company_name.includes(filterText))) &&
    (filterOwner === '' || (item.owners_name && item.owners_name.includes(filterOwner))) &&
    (filterEmail === '' || (item.email && item.email.includes(filterEmail)))
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter By Company Name"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter By Owner's Name"
        value={filterOwner}
        onChange={e => setFilterOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter By Email"
        value={filterEmail}
        onChange={e => setFilterEmail(e.target.value)}
      />
      <DataTable
        title="FortiClient VPN"
        columns={columns}
        data={filteredData}
        pagination
        responsive
        highlightOnHover
        onRowClicked={row => handleRowClick(row.vpn_id)}
        onSelectedRowsChange={({ selectedRows }) => setSelectedId(selectedRows[0].vpn_id)}
      />
      <DeleteModal vpn_id={selectedId} deleteFortiClient={deleteFortiClient} />
      <button onClick={() => handleRowClick2(selectedData)}>Edit</button>
    </div>
  );
};

export default FortiClientVPNTable;


