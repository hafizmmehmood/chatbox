import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    buttonDrawerPaper: {
    position: 'fixed!important',
    width: 'auto!important',
    right: '0%!important',
    top: '35vh!important',
    height: 'auto!important',
    overflowY: 'hidden!important', // hide vertical
    overflowX: 'hidden!important', // hide horizontal
    backgroundColor: '#fff',
    boxShadow: 'rgb(141, 62, 245) 0px 2px 35px -10px',
    border: '0px solid #000',
    borderRadius: '8px',
    overflow: 'auto',
    padding: '2px',
    zIndex: 1000,
  },
    promoSectionButtons: {
    boxShadow:
      '0 0.313rem 0.8rem rgb(122 123 151 / 50 %), 0 0.126rem 0.225rem rgb(122 123 151 / 30 %)',
    display: 'flex',
    padding: '0px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: '.65rem',
    borderBottomLeftRadius: '.65rem'
  }
}));

export default useStyles;