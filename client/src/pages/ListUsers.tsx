import React, { Component} from 'react';
import Wrapper from '../components/Wrapper';

interface ListUsersProps {

}

interface ListUsersState { 

}

class ListUsers extends Component<ListUsersProps, ListUsersState> {

  public render(){
    return (
      <Wrapper>
        <div className="row">
          <div className="col-12 mx-auto">
              <div className="text-center">
                Welcome to List Users
              </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  
}

export default ListUsers;
