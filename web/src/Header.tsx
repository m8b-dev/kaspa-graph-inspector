import {AppBar, CircularProgress, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import Logo from "./Logo";
import FastForwardIcon from '@material-ui/icons/FastForward';
import Dag from "./dag/Dag";
import {useState} from "react";

const Header = ({dag}: { dag: Dag }) => {
    const classes = useStyles();

    const [isTrackingState, setTrackingState] = useState(true);
    const [isHavingConnectionIssuesState, setHavingConnectionIssuesState] = useState(false);

    dag.setIsTrackingChangedListener(isTracking => setTrackingState(isTracking));
    dag.setIsFetchFailingListener(isFailing => setHavingConnectionIssuesState(isFailing));

    return (
        <AppBar position="static">
            <Toolbar>
                <Logo/>
                <Typography variant="h6" className={classes.title}>
                    Kaspa Graph Inspector
                </Typography>
                <div className={classes.grow}/>
                {!isHavingConnectionIssuesState ? undefined :
                    <CircularProgress color="inherit" thickness={6.0} size="24px"/>
                }
                {isTrackingState ? undefined :
                    <IconButton color="inherit" onClick={() => (dag as Dag).setStateTrackHead()}>
                        <FastForwardIcon/>
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        marginTop: 5,
        marginLeft: 10,
    },
    grow: {
        flexGrow: 1,
    },
}));

export default Header;
