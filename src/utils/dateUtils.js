const getDateSince = ({ dateString }) => {
  if (dateString === null || dateString === undefined) {
    return '';
  }
  const date = new Date(dateString);
  const dateSince = new Date() - date;
  if (dateSince / (1000 * 60 * 60 * 24 * 7 * 4 * 12) >= 1) {
    return `${Math.trunc(
      dateSince / (1000 * 60 * 60 * 24 * 7 * 4 * 12)
    )} years ago`;
  } else if (dateSince / (1000 * 60 * 60 * 24 * 7 * 4) >= 1) {
    return `${Math.trunc(
      dateSince / (1000 * 60 * 60 * 24 * 7 * 4)
    )} months ago`;
  } else if (dateSince / (1000 * 60 * 60 * 24 * 7) >= 1) {
    return `${Math.trunc(dateSince / (1000 * 60 * 60 * 24 * 7))} weeks ago`;
  } else if (dateSince / (1000 * 60 * 60 * 24) >= 1) {
    return `${Math.trunc(dateSince / (1000 * 60 * 60 * 24))} days ago`;
  } else if (dateSince / (1000 * 60 * 60) >= 1) {
    return `${Math.trunc(dateSince / (1000 * 60 * 60))} hours ago`;
  } else if (dateSince / (1000 * 60) >= 1) {
    return `${Math.trunc(dateSince / (1000 * 60))} minutes ago`;
  } else {
    return `${Math.trunc(dateSince / 1000)} seconds ago`;
  }
};

export { getDateSince };
