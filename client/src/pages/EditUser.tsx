import React, { Component} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import Wrapper from '../components/Wrapper';


interface IValues {
    [key: string]: any;
}

interface IFormState {
    id: number,
    user: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}


class EditUser extends Component<RouteComponentProps<any>, IFormState> {

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
        id: this.props.match.params.id,
        user: {},
        values: [],
        loading: false,
        submitSuccess: false,
    }
  }

  public componentDidMount(): void {
      axios.get(`http://localhost:5000/users/${this.state.id}`).then(data => {
        this.setState({ user: data.data });
      });
  }

  private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        console.log("this.state.values");
        console.log(this.state.values)
        axios.patch(`http://localhost:5000/users/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/list-users');
            }, 1500)
        })
    }

    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

  public render(){
    const { submitSuccess, loading } = this.state;

    return (
      <Wrapper>
        <div className="row">
          <div className="col-12 mx-auto">
              <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Edit User </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            User Details
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
                            <input type="text" id="first_name" defaultValue={this.state.user.first_name} onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter user's first name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="last_name"> Last Name </label>
                            <input type="text" id="last_name" defaultValue={this.state.user.last_name} onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter user's last name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="email"> Email </label>
                            <input type="email" id="email" defaultValue={this.state.user.email} onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter user's email address" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="phone"> Phone </label>
                            <input type="text" id="phone" defaultValue={this.state.user.phone} onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter user's phone number" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="address"> Address </label>
                            <input type="text" id="address" defaultValue={this.state.user.address} onChange={(e) => this.handleInputChanges(e)} name="address" className="form-control" placeholder="Enter user's address" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" defaultValue={this.state.user.description} onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
                        </div>

                        <div className="form-group col-md-4 pull-right" style={{ marginTop: "20px" }}>
                            <button className="btn btn-success" type="submit">
                                Edit User
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

export default EditUser;
