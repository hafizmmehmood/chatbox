import * as Yup from 'yup';
export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  id: ''
};

export const AdminSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required!'),
  lastName: Yup.string().required('Last Name is required!'),
  email: Yup.string()
    .email('Invalid email address!')
    .required('Email is required!')
});

export const headCells = [
  {
    id: 'firstName',
    numeric: true,
    disablePadding: true,
    label: 'First Name',
    sort: true
  },
  {
    id: 'lastName',
    numeric: true,
    disablePadding: false,
    label: 'Last Name',
    sort: true
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
    sort: true
  },
  {
    id: 'enabled',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    sort: false
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
    sort: false
  }
];

export const setAdminArr = data => {
  return data.map(d => {
    return {
      firstName: d.firstName ? d.firstName.toLowerCase() : '',
      lastName: d.lastName ? d.lastName.toLowerCase() : '',
      email: d.email ? d.email.toLowerCase() : '',
      enabled: d.enabled || '',
      id: d.id || '',
      role: d.role || ''
    };
  });
};

export const filteredData = (searchedVal, data) => {
  const filteredRows = data.filter(row => {
    let match = false;
    // match first name
    if (!match && row.firstName) {
      match = row.firstName.includes(searchedVal.toLowerCase());
    }
    // match last name
    if (!match && row.lastName) {
      match = row.lastName.includes(searchedVal.toLowerCase());
    }
    // match email
    if (!match && row.email) {
      match = row.email.includes(searchedVal.toLowerCase());
    }
    return match;
  });
  return filteredRows;
};
