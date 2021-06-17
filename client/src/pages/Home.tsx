import React, { Component} from 'react';
import Wrapper from '../components/Wrapper';

interface HomeProps {

}

interface HomeState { 

}

class Home extends Component<HomeProps, HomeState> {

  public render(){
    return (
      <Wrapper>
        <div className="row">
          <div className="col-12 mx-auto">
              <div className="text-center">
                Welcome to Home Page
              </div>
          </div>
        </div>
      </Wrapper>
    );
  }
  
}

export default Home;
