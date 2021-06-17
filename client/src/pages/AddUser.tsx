import React, { Component} from 'react';
import Wrapper from '../components/Wrapper';

interface AddUserProps {

}

interface AddUserState { 

}

class AddUser extends Component<AddUserProps, AddUserState> {

  public render(){
    return (
      <Wrapper>
        <div className="row">
          <div className="col-12 mx-auto">
              <div className="text-center">
                Welcome to Add User
              </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  
}

export default AddUser;
