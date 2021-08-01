import { React, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PublicRoute from 'router/PublicRoute';
import PrivateRoute from 'router/PrivateRoute';
import Dashboard from 'views/Client/Dashboard';
import Home from 'views/Auth/Home';
import Login from 'views/Auth/Login';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '99%',
        maxWidth: 360,
        margin: '80px 0 0 0',
        backgroundColor: theme.palette.background.default,
    },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Navbar(props) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const classes = useStyles();

    return (
        <BrowserRouter>
            <IconContext.Provider value={{color: '#f3f3f3'}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <div className={classes.root} onClick={showSidebar}>
                    <Link to="#">
                        <AiIcons.AiOutlineClose  className='text-secondary'/>
                    </Link>
                    <List component="nav" aria-label="main mailbox folders">
                        {SidebarData.map((item, index) => {
                            return (
                                <section key={index}>
                                    <ListItemLink className={item.cName} href={item.path}>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemLink>
                                    <Divider />
                                </section>
                            );
                        })
                        }
                    </List>
                </div>
            </nav>
            </IconContext.Provider>
            <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}
