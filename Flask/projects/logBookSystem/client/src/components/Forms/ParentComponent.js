// ParentComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FortiClientForm from './FortiClientForm';

const ParentComponent = ({ selectedVpnId }) => {
  const [fortiClientData, setFortiClientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get-forticlient-data/${selectedVpnId}`);
        setFortiClientData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedVpnId) {
      fetchData();
    }
  }, [selectedVpnId]);

  return (
    <div>
      {fortiClientData && (
        <FortiClientForm vpn_id={selectedVpnId} initialValues={fortiClientData} />
      )}
    </div>
  );
};

export default ParentComponent;