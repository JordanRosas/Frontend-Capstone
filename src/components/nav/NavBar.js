
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People'
import HouseIcon from '@material-ui/icons/Home'
import MessageIcon from '@material-ui/icons/Message'
import PersonIcon from '@material-ui/icons/Person'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import './Navbar.css'

    
        const styles = {
        list: {
        width: 300,
        },
        menuButton: {
            marginLeft: 12,
        }
    };

    class NavBar extends Component {
        state = {
        left: false,
        };

        toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
        };

        endSessionStorage = () => {
        sessionStorage.clear()
    }
        render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list}>
            <MenuList>
                <MenuItem component={Link} to='/home'>
                <IconButton>
                    <HouseIcon color='action' />
                </IconButton>
                    Home
                </MenuItem>
                <MenuItem component={Link} to='/friends'>
                <IconButton>
                    <PeopleIcon color='action' />
                </IconButton>
                    Friends
                </MenuItem>
                <MenuItem component={Link} to='/messages'>
                <IconButton>
                    <MessageIcon color='action' />
                </IconButton>
                    Messages
                </MenuItem>
                <MenuItem component={Link} to='/profile'>
                <IconButton>
                    <PersonIcon color='action' />
                </IconButton>
                    Profile
                </MenuItem>
            </MenuList>
            <Divider />
            <MenuList>
                <MenuItem className="signout" onClick={this.endSessionStorage} component={Link} to='/'>
                    <IconButton>
                        <SkipPreviousIcon color='action' />
                    </IconButton>
                        Sign out
                </MenuItem>
            </MenuList>
            <Divider />
            </div>
        );

        return (
            <nav>
            <IconButton className={classes.menuButton} color='default' aria-label="Menu" onClick={this.toggleDrawer('left', true)} >
                <MenuIcon className="menuIcon" />
            </IconButton>
            {/* <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button> */}
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
                >
                {sideList}
                </div>
            </Drawer>
            </nav>
            
        );
        }
    }

    NavBar.propTypes = {
        classes: PropTypes.object.isRequired,
    };
        
export default withStyles(styles)(NavBar);