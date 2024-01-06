// In DeleteModal.js
import { Modal, Button } from 'antd';
import { useState } from 'react';

const DeleteModal = ({ id, deleteItem }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => setOpen(true);
  const hideModal = () => setOpen(false);

  const handleDelete = () => {
    deleteItem(id);
    hideModal();
  };

  return (
    <>
      <Button onClick={showModal}>Delete</Button>
      <Modal
        title="Are you sure you want to delete this data?"
        open={open} // Use 'open' instead of 'visible'
        onOk={handleDelete}
        onCancel={hideModal}
      >
        <p>Deleting this data cannot be undone.</p>
      </Modal>
    </>
  );
};

export default DeleteModal;