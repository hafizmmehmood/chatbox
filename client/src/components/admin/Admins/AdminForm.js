import React from 'react';
import { Formik } from 'formik';
import AdminFormBody from './AdminFormBody';
import { initialValues, AdminSchema } from './helper';

function AdminForm({ loading, onHandleSubmit, onClose, actionState, admin }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, handles) => {
        onHandleSubmit(values, handles);
      }}
      validationSchema={AdminSchema}>
      {props => {
        const {
          touched,
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue
        } = props;
        return (
          <AdminFormBody
            onClose={onClose}
            loading={loading}
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            actionState={actionState}
            admin={admin}
          />
        );
      }}
    </Formik>
  );
}

export default AdminForm;
