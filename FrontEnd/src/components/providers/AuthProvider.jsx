import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

// Pour décoder le token
let jwtDecode = require('jwt-decode');


const {
  Provider: AuthContextProvider,
  Consumer: AuthContext,
} = React.createContext();


const mutLogin = gql`
  mutation ($email: String!, $password: String!){
    login(email:$email, password:$password){
      token
    }
  }
  `;

const mutRelog = gql`
  mutation{
    renewToken{
      token
    }
  }
  `;

  
const subNotif = gql`
  subscription{
    newNotificationReceived{
      id
    }
  }
  `;

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      userMail: null,
      userStatus: null,
      isAdmin: false,
      userEmailValidated: false,
      userToken: null,


      error: null,

      signIn: this.signIn,
      signOut: this.signOut,
      //renewToken: this.renewToken,
      clearError: this.clearError,
    };
  }

  clearError = () => {
    this.setState({error: null});
  }


  componentWillMount() {
    const token = window.localStorage.getItem('token');
    console.log(token);
    if(token) this.addState(token);
    if (token) {
      const { client } = this.props;
      client.mutate({ mutation: mutRelog })
        .then(
          (data) => { 
            this.addState(data.data.renewToken.token);
            window.localStorage.setItem('token', data.data.renewToken.token);
            //this.props.enqueueSnackbar('Connexion requise pour avoir accps', "info");
          }
        ).catch(
          (error) => {
            console.log("Error relog", error);
            this.signOut();
          }
        );
    }
  }

  // Permet de mettre à jour le token
  renewToken = (token) => {
    window.localStorage.setItem('token', token);
    this.addState(token);
  }

  // Décode le token et l'insère dans le state
  addState = (token) => {
    const decoded = jwtDecode(token);
    console.info("token", token);
    this.setState({
      notificationCount: 0,
      userId: decoded.id,
      userMail: decoded.email,
      userStatus: decoded.kind,
      isAdmin: decoded.isAdmin,
      userEmailValidated: decoded.emailValidated,
      userToken: token,

      error: null,
    });
  }

  subscribe = () => {
    // call the "subscribe" method on Apollo Client
    this.subscriptionObserver = this.props.client.subscribe({
      query: subNotif,
    }).subscribe({
      next(data) {
        this.setState(prevState => ({
          notificationCount: ++prevState.notificationCount
        }));
      },
      error(err) { console.error('err', err); },
    });
  }


  signIn = async ({ userMail, password }) => {
    const { client } = this.props;
    console.log({ userMail, password });
    return client.mutate({ mutation: mutLogin, variables: { email: userMail, password: password } }).then(
      (data) => {
        console.log(data);
        this.addState(data.data.login.token);
        window.localStorage.setItem('token', data.data.login.token);
        this.subscribe();
        return true;
      }
    ).catch((error) => {
      console.info(error);
      this.setState({ error: 'Email ou mot de passe faux' });
      return false;
    });
  }

  signOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }


  render() {
    const { children } = this.props;
    return (
      <>
        <AuthContextProvider value={this.state}>
          {children}
        </AuthContextProvider>
      </>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

AuthProvider.defaultProps = {
  children: null,
};


export { AuthContext };
export default withApollo(AuthProvider);
