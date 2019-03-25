import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions/auth";

const TopNavigation = ({ user, logout }) => (
    <Menu size="huge" secondary pointing>
      <Menu.Item as={Link} to="/procese">Procese verbale</Menu.Item>
      <Menu.Item as={Link} to="/controlori">Controlori</Menu.Item>
      <Menu.Menu position="right">
        <Dropdown trigger={<Label><Icon size="large" name="user"/>{user.name}</Label>}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => logout()}> Logout </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
;


TopNavigation.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(TopNavigation);