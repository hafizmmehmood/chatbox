import { ListItem } from '@mui/material';
const TabListItem = ({ activeTab, type, title, toggle, pendingStatus }) => {
  return (
    <ListItem
      button
      className="p-0 py-4 m-0 mr-3 text-lg rounded-0 width-fit"
      id={type + '-trade-tab'}
      selected={activeTab === type}
      onClick={() => {
        toggle(type);
      }}>
      <span className="text-bold text-lg text-Capitalize">
        {title}
      </span>
      {pendingStatus[type] ? (
        <div className="flex mb-1 opacity-6 ml-1 ">
          <div className="badge badge-warning mb-1 border-0 badge-circle ">
            {title}
          </div>
        </div>
      ) : null}
      <div className="divider" />
    </ListItem>
  );
};

export default TabListItem;
