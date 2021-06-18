import React, { Component} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Wrapper from '../components/Wrapper';
import axios from 'axios';

interface ListUsersState { 
  users: any[];
}

class ListUsers extends Component<RouteComponentProps, ListUsersState> {
  constructor(props: RouteComponentProps){
    super(props);

    this.state = { 
      users: []
    };
  }

  public componentDidMount(): void {
    axios.get(`http://localhost:5000/users`).then(data => {
      console.log("users data..");
      console.log(data);
      this.setState({users: data.data});
    });
  }

  public deleteUser(id: number): void {
    axios.delete(`http://localhost:5000/users/${id}`).then(data =>{
      const index = this.state.users.findIndex(user => user.id === id);
      this.state.users.splice(index, 1);
      this.props.history.push('/list-users');
    });
  };

  public render(){
    console.log("users..");
    console.log(this.state.users);
    const { users } = this.state;

    return (
      <Wrapper>
        <div className="row">
          <div className="col-12 mx-auto">
              {users.length === 0 && (
                <div className="text-center">
                  <h4>No user found at the moment</h4>
                </div>
              )}
              {users && (
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user =>
                                    <tr key={user.id}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>{user.description}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteUser(user.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
              )}
          </div>
        </div>
      </Wrapper>
    );
  }
  
}

export default ListUsers;
