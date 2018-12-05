import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';

import AccountIcon from '@material-ui/icons/AccountCircleRounded';


import { withStyles } from '@material-ui/core';

import StatusForm from './StatusForm';
import GeneralsConditionForm from './GeneralsConditionForm';
import InformationsForm from './InformationsForm';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  LinkButton: {
    textDecoration: 'none',
    color: 'inherit'
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    width: '100%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
  grow: {
    flexGrow: 1
  },
});

const steps = ['Informations', 'Status', 'Conditions générales'];
const errorNoCG = 'Vous devez accetter les conditions générales avant de pouvoir continuer.';

class InscriptionContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      errorMessage: '',
      email: '',
      lastName: '',
      firstName: '',
      password: '',
      passwordConf: '',
      status: 'user',
      GC: false,
    };
  }




  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleChange = prop => (event) => {
    this.setState({
      [prop]: event.target.value,
    });
  };

  handleChangeCheckBox = prop => (event) => {
    this.setState({
      [prop]: event.target.checked,
    });
  };

  getStepContent(step) {
    const { email, lastName, firstName, password, passwordConf, status, GC } = this.state;
    switch (step) {
      case 0:
        return (
          <InformationsForm
            email={email}
            lastName={lastName}
            firstName={firstName}
            password={password}
            passwordConf={passwordConf}
            onChange={this.handleChange}
          />
        );
      case 1:
        return <StatusForm value={status} onChange={this.handleChange} />;
      case 2:
        return <GeneralsConditionForm value={GC} onChange={this.handleChangeCheckBox} />;
      default:
        throw new Error('Erreur');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.GC && this.state.activeStep === 2) {
      this.setState({ errorMessage: errorNoCG });
    } else {
      this.setState(state => ({
        errorMessage: '',
        activeStep: state.activeStep + 1,
      }));
    }
  }

  render() {
    const { classes, onValidate, onClose  } = this.props;

    const { activeStep, errorMessage, email } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountIcon />
            </Avatar>


            <Typography paragraph component="h1" variant="h5">
              {`Création d'un nouveau compte`}
              <br/>

            </Typography>
            <form id="form" onSubmit={this.handleSubmit}>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="subtitle1">
                      Votre compte à été créé: {email}
                      <br />
                      Veuillez-aller sur votre adresse mail pour confirmer l'inscrition.
                    </Typography>
                    <Button
                      onClick={onValidate}
                      variant="contained"
                      className={classes.button}
                      color="primary"
                    >
                      fermer
                    </Button>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      
                      
                      {this.getStepContent(activeStep)}

                      <Typography color="error">
                        {errorMessage}
                      </Typography>

                      <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      <div className={classes.buttons}>

                        <Button
                          onClick={onClose}
                          className={classes.button}
                          tabindex="-1"
                        >
                          Annuler
                        </Button>
                        <div className={classes.grow} />
                        {activeStep !== 0 && (
                          <Button onClick={this.handleBack} className={classes.button}>
                            Retour
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                        </Button>
                      </div>
                    </React.Fragment>
                  )}
              </React.Fragment>
            </form>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

InscriptionContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InscriptionContainer);