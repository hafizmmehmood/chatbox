import React, { useState, useCallback } from 'react';
import AdminsList from './AdminsList';
import AdminsHeader from './AdminsHeader';
import useFetch from '../../../hooks/useFetch';
import {
  GetAdmins,
  CreateAdmin,
  UpdateAdmin,
  EnableOrDisableAdmin,
  ResentInvitation
} from '../../../services/admin/Admins';
import FormModal from '../../shared/Modals/FormModal';
import AdminForm from './AdminForm';
import { success, error } from '../../shared/Helpers';

function Admins() {
  const { data, loading, setData, refreshData } = useFetch(GetAdmins);
  const [isOpen, setIsOpen] = useState(false);
  const [adminCreateLoading, setAdminCreateLoading] = useState(false);
  const [actionState, setActionState] = useState(false);
  const [admin, setAdmin] = useState(null);

  const closeModal = useCallback(() => {
    setActionState(false);
    setAdmin(null);
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setActionState(false);
    setAdmin(null);
    setIsOpen(true);
  }, []);

  const onClickEdit = useCallback((obj) => {
    setActionState(true);
    setAdmin(obj);
    setIsOpen(true);
  }, []);

  const onHandleEnableChange = async (enabled, id) => {
    const resp = await EnableOrDisableAdmin({ id: id, enabled: enabled });
    if (resp.status === 200) {
      success(resp.message);
    } else {
      error(resp.message);
    }
  };

  const onResentInvitation = async (id) => {
    const resp = await ResentInvitation(id);
    if (resp.status === 200) {
      success(resp.message);
    } else {
      error(resp.message);
    }
  };

  const refreshAdminList = () => {
    refreshData();
  };

  const onHandleSubmit = async (values, handles) => {
    setAdminCreateLoading(true);
    if (!actionState) {
      const resp = await CreateAdmin(values);
      if (resp.status === 200) {
        setAdminCreateLoading(false);
        setData((prev) => [resp.data, ...prev]);
        success(resp.message);
        handles.resetForm();
        closeModal();
      } else {
        setAdminCreateLoading(false);
        error(resp.message);
      }
    } else {
      const resp = await UpdateAdmin(values, values.id);
      if (resp.status === 200) {
        setAdminCreateLoading(false);
        setData((prev) =>
          prev.map((r) =>
            r.id === resp.data.id
              ? {
                  id: resp.data.id,
                  firstName: resp.data.firstName,
                  lastName: resp.data.lastName,
                  email: resp.data.email,
                  enabled: resp.data.enabled
                }
              : r
          )
        );
        success(resp.message);
        handles.resetForm();
        closeModal();
      } else {
        setAdminCreateLoading(false);
        error(resp.message);
      }
    }
  };

  return (
    <div>
      <AdminsHeader onClick={openModal} />
      <AdminsList
        data={data}
        loading={loading}
        onClickEdit={onClickEdit}
        onHandleEnableChange={onHandleEnableChange}
        onResentInvitation={onResentInvitation}
        refreshAdminList={refreshAdminList}
      />
      <FormModal
        maxWidth="sm"
        open={isOpen}
        onClose={closeModal}
        title={!actionState ? 'Create Admin' : 'Edit Admin'}>
        <AdminForm
          onHandleSubmit={onHandleSubmit}
          loading={adminCreateLoading}
          onClose={closeModal}
          actionState={actionState}
          admin={admin}
        />
      </FormModal>
    </div>
  );
}

export default Admins;
