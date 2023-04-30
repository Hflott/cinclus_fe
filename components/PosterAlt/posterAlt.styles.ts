export const styles = {
  posterAlt: {
    height: "90px",
    p: 1,
    flexWrap: "nowrap",
    "&:hover": {
      bgcolor: "background.default",
    },
  },
  posterImg: {
    position: "relative",
    width: "49.5px",
    height: "74.25px",
    flexShrink: 0,
  },
  posterTxt: {
    flex: 1,
    marginLeft: 1,
    overflow: "hidden",
  },
  posterTxtHead: {
    fontSize: "12px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "inherit",
    mb: "5px",
  },
  posterTxtSub: {
    display: "flex",
  },
  posterType: {
    position: "relative",
    m: "0 15px",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "2px",
      left: "-15px",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: "rgba(255,255,255,.3)",
      // display: 'inline-block',
      margin: "3px 6px",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "2px",
      right: "-15px",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: "rgba(255,255,255,.3)",
      // display: 'inline-block',
      margin: "3px 6px",
    },
  },
};
