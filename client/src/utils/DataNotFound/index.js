export const DataNotFoundRows = ({ col = 8 }) => {
  return (
    <tr>
      <td className="px-4 text-center font-size-xs" colSpan={col}>
        <img
          className="data-not-found-image"
          src="images/data-not-found.png"
          alt="Data Not Found!"
        />
      </td>
    </tr>
  );
};

export const DataNotFound = () => {
  return (
    <div className="text-center w-full">
      <img
        className="min-w-full object-fit-contain"
        src="images/data-not-found.png"
        alt="Data Not Found!"
      />
    </div>
  );
};
