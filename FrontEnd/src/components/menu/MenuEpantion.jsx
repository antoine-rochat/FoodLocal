import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';


import { Link } from 'react-router-dom';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import RegisterIcone from '@material-ui/icons/HowToReg';
import SettingsIcone from '@material-ui/icons/Settings';
import BuildIcone from '@material-ui/icons/Build';
import BadgeMax from '../items/BadgeMax';

import { withStyles } from '@material-ui/core/styles';

import { AuthContext } from '../providers/AuthProvider';

const styles = {
  root: {
    flexGrow: 1,
    position: 'fixed',
    weight: '100%',
    height: '64px',
    top: 0,
    shadow: 'none',
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -7,
    marginRight: 20,
    paddingTop: 4,
    height: '60px',
    outline: 'none',
  },
  LinkButton: {
    textDecoration: 'none',
    color: 'secondary',
  }
};

class MenuEpantion extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClickMenu = prop => (event) => {
    this.setState({ anchorEl: event.currentTarget });
    return this.props.onClick(prop);
  };


  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { classes, onClick } = this.props;
    const { anchorEl } = this.state;

    const loggedMenu = (userStatus, isAdmin, signOut, notificationsCount) => (
      <MenuList>
        <Link to="/myWall" className={classes.LinkButton}>
          <MenuItem button onClick={this.handleClose}>
            <ListItemIcon>
              <BadgeMax value={notificationsCount} />
              {/* TODO: icone */}
            </ListItemIcon>
            <ListItemText primary="Mon mur" />
          </MenuItem>
        </Link>
        <Link to="/myProducers" className={classes.LinkButton}>
          <MenuItem button onClick={this.handleClose}>
            <ListItemIcon>
              {/* TODO: icone */}
            </ListItemIcon>
            <ListItemText primary="Mes producteurs" />
          </MenuItem>
        </Link>

        {userStatus &&
          (
            <Link to="/producerRegistration" className={classes.LinkButton}>
              <MenuItem button onClick={this.handleClose}>
                { /* TODO: addicone
                <ListItemIcon>
                  <BuildIcone color="primary" />
                </ListItemIcon>
                */
                }
                <ListItemText primary="Mon point de vente" />
              </MenuItem>
            </Link>
          )
        }

        <Link to="/settings" className={classes.LinkButton}>
          <MenuItem button onClick={this.handleClose}>
            <ListItemIcon>
              <SettingsIcone color="primary" />
            </ListItemIcon>
            <ListItemText primary="Paramètres" />
          </MenuItem>
        </Link>

        {isAdmin &&
          (
            <Link to="/adminSection" className={classes.LinkButton}>
              <MenuItem button onClick={this.handleClose}>
                <ListItemIcon>
                  <BuildIcone color="primary" />
                </ListItemIcon>
                <ListItemText primary="Section administrateur" />
              </MenuItem>
            </Link>
          )
        }

        <MenuItem
          button
          onClick={
            () => {
              onClick('logOut');
              signOut();
              //onClick('logOut');
            }
          }
        >
          <ListItemIcon>
            <RegisterIcone color="primary" />
          </ListItemIcon>
          <ListItemText primary="Se déconnecter" />
        </MenuItem>
      </MenuList>
    );

    return (
      <>

        <IconButton
          caria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <AuthContext>
            {({ userStatus, isAdmin, signOut, notificationsCount }) => (

              loggedMenu(userStatus, isAdmin, signOut, notificationsCount)

            )}
          </AuthContext>
        </Menu>
      </>
    );
  }
}

export default withStyles(styles)(MenuEpantion);
