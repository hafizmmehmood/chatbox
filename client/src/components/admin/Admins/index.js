import React, { useState, useCallback } from 'react';
import AdminsList from './AdminsList';
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
import {

  _ADMIN,
} from '../../../utils/Constants';
import FloatingButton from '../../shared/Button-float'
import { useQuery, useMutation, useQueryClient } from 'react-query';

function Admins() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, setActionState] = useState(false);
  const [admin, setAdmin] = useState(null);

  const handleSuccess = (resp, type) => {
    const { status, message } = resp;
    if(status === 200) {
      if(type !== 'getAdmins') {
        success(message);
        queryClient.invalidateQueries('admins');
        //refetchAdmins();
      }
    } else {
      error(message);
    }
    closeModal();
  }
  const handleError = (error) => {
    console.log(error)
    error(error.message);
  }

  const { data: { data } = [], isLoading, refetch: refetchAdmins } = useQuery('admins', GetAdmins, {
    onSuccess: (res)=>handleSuccess(res, 'getAdmins'),
    onError: handleError,
  });
  const { mutate: createAdmin, isLoading: adminCreateLoading } = useMutation(CreateAdmin,  {
    onSuccess: handleSuccess,
    onError: handleError,
  });
  const { mutate: updateAdmin, isLoading: adminUpdateLoading } = useMutation(UpdateAdmin, {
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { mutate: disableAdmin } = useMutation(EnableOrDisableAdmin, {
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { mutate: resentInvitation } = useMutation(ResentInvitation, {
    onSuccess: handleSuccess,
    onError: handleError,
  });

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
    disableAdmin({ id: id, enabled: enabled });
  };

  const onResentInvitation = async (id) => {
    resentInvitation(id);
  };

  const refreshAdminList = () => {
    refetchAdmins();
  };

  const onHandleSubmit = async (values, handles) => {
    if (!actionState) {
      createAdmin(values);
      handles.resetForm();
    } else {
      updateAdmin({formData: values, id: values.id});
      handles.resetForm();
    }
  };

  return (
    <div>
      <FloatingButton
        type={_ADMIN}
        currencyType={_ADMIN}
        refetch={refreshAdminList}
        handleModalOpen={openModal}
      />
      <AdminsList
        data={data}
        loading={isLoading}
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
          loading={adminCreateLoading || adminUpdateLoading}
          onClose={closeModal}
          actionState={actionState}
          admin={admin}
        />
      </FormModal>
    </div>
  );
}

export default Admins;
