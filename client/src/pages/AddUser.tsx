import React, { Component} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import Wrapper from '../components/Wrapper';

export interface IValues {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  address: string,
  description: string,
}

export interface AddUserState {
  [key: string]: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}


class AddUser extends Component<RouteComponentProps, AddUserState> {

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        values: [],
        loading: false,
        submitSuccess: false,
    }
  }

  private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      this.setState({ loading: true });

      if (this.state.first_name && this.state.last_name && this.state.email && this.state.phone && this.state.address && this.state.description) {
        const formData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            description: this.state.description,
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`http://localhost:5000/users`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/list-users');
            }, 1500)
        ]);
      }
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      this.setState({
          [e.currentTarget.name]: e.currentTarget.value,
      })
  }

  public render(){
    const { submitSuccess, loading } = this.state;

    return (
      <Wrapper>
        <div className="row">
          <div className="col-12 mx-auto">
              <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Add User </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new post
                    </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                            </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="first_name"> First Name </label>
                            <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter user's first name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="last_name"> Last Name </label>
                            <input type="text" id="last_name" onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter user's last name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="email"> Email </label>
                            <input type="email" id="email" onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter user's email address" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="phone"> Phone </label>
                            <input type="text" id="phone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter user's phone number" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="address"> Address </label>
                            <input type="text" id="address" onChange={(e) => this.handleInputChanges(e)} name="address" className="form-control" placeholder="Enter user's address" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
                        </div>

                        <div className="form-group col-md-4 pull-right" style={{ marginTop: "20px" }}>
                            <button className="btn btn-success" type="submit">
                                Add User
                            </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  
}

export default AddUser;
