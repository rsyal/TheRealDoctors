import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import './SignupFormMui.css';

// const styles = theme => ({
//   root: {
//     textAlign: 'center',
//     paddingTop: theme.spacing.unit * 20,
//   },
// });

const SignupFormMui = ({
  onClick,
  onChange,
  errors,
  blogger
}) => (
       <h2 className="card-heading">Sign Up</h2>
  // <Card className="container">
  //   <form >
  //     <h2 className="card-heading">Sign Up</h2>

  //     {errors.summary && <p className="error-message">{errors.summary}</p>}

  //     <div className="field-line">
  //       <TextField
  //         floatingLabelText="First name"
  //         name="firstName"
  //         //errorText={errors.firstName ? errors.firstName : ''}
  //         onChange={onChange}
  //         value={blogger.firstName}
  //       />
  //     </div>

  //     <div className="field-line">
  //     <TextField
  //         floatingLabelText="Last name"
  //         name="lastName"
  //         //errorText={errors.lastName}
  //         onChange={onChange}
  //         value={blogger.lastName}
  //       />
  //     </div>

  //     <div className="field-line">
  //       <TextField
  //         floatingLabelText="Email"
  //         name="email"
  //         //errorText={errors.email}
  //         onChange={onChange}
  //         value={blogger.email}
  //         helperText="Email must be the same google email you will use in login"
  //       />
  //     </div>

  //     <div className="field-line">
  //       <TextField
  //         required 
  //         floatingLabelText="NPM number"
  //         name="npmnumber"
  //         onChange={onChange}
  //         //errorText={errors.npmnumber}
  //         value={blogger.npmnumber}
  //       />
  //     </div>

  //     <div className="field-line">
  //       <TextField
  //         required
  //         floatingLabelText="Specialty"
  //         name="specialty"
  //         onChange={onChange}
  //         //errorText={errors.specialty}
  //         value={blogger.specialty}
  //       />
  //     </div>

  //     {/* <div className="button-line">
  //       <Button label="Create New Account" primary onClick={onClick}/>
  //     </div> */}

  //     <CardText>Already have an account? <Link to={'/'}>Log in</Link></CardText>
  //   </form>
  // </Card>
);

SignupFormMui.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  blogger: PropTypes.object.isRequired
};

//export default withStyles(styles)(SignupFormMui);
export default SignupFormMui;
