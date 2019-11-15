import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareOutlined from "@material-ui/icons/ShareOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import ActiveLink from "./ActiveLink";
import { signoutUser } from "../lib/auth";
import { Avatar, Grid } from "@material-ui/core";

const Navbar = ({ classes, router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};

  return (
    <AppBar
      className={classes.appBar}
      position={router.pathname === "/" ? "fixed" : "static"}
    >
      <Toolbar>
        {/* Main title / Home button */}
        <ActiveLink href="/">
          <ShareOutlined className={classes.icon} />
        </ActiveLink>
        <Typography
          variant="h5"
          component="h1"
          className={classes.toolbarTitle}
        >
          <ActiveLink href="/">NextConnect</ActiveLink>
        </Typography>
        {user._id ? (
          <div>
            <Grid container alignItems="center" justify="center">
              <Avatar
                className={classes.avatar}
                src={user.avatar}
                style={{ marginRight: "10px" }}
              />
              <Button style={{ marginRight: "10px" }}>
                <ActiveLink href={`/profile/${user._id}`}>Profile</ActiveLink>
              </Button>
              <Button variant="outlined" onClick={signoutUser}>
                Sign Out
              </Button>
            </Grid>
          </div>
        ) : (
          <div>
            <Button>
              <ActiveLink href="/signin">Sign in</ActiveLink>
            </Button>
            <Button>
              <ActiveLink href="/signup">Sign up</ActiveLink>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const styles = theme => ({
  appBar: {
    // z-index 1 higher than the fixed drawer in home page to clip it under the navigation
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarTitle: {
    flex: 1
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  avatar: {
    margin: 10,
    width: 30,
    height: 30
  }
});

export default withStyles(styles)(Navbar);
