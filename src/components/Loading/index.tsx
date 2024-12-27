import classes from "./Loading.module.css";

function Loading() {
  return (
    <div className={classes.container}>
      <div className={`${classes.spinner} ${classes.center}`}>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
        <div className={classes.spinnerBlade}></div>
      </div>
    </div>
  );
}

export default Loading;
