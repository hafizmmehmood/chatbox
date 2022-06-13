function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}


export const chainsList = [
  { id: 'bsc', name: 'Bsc' },
  { id: 'matic', name: 'Matic' },
  { id: 'avax', name: 'Avax' },
  { id: 'bsc-testnet', name: 'Bsc-Testnet' },
  { id: 'matic-testnet', name: 'Matic-Testnet' },
  { id: 'avax-testnet', name: 'Avax-Testnet' }
];
