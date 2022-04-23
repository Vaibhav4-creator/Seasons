import React from "react";
import ReactDOM  from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner"

class App extends React.Component {
    //Constructor is an alternate method and it is okay not to use it.
    //Constructor automatically runs first in w.r.t any other function.
    // constructor(props) {
    //     super(props)

    //     this.state = { lat: null, errorMessage: ''}

       
    // }
    //state doesn't require constructor function to run. 
    //below state is equivalent to the whole constructor function above as babel will automatically apply constructor function.
    state = { lat: null, errorMessage:''}

    //componentDidMount is used when we want to initialize data once and hence we've shifted it from constructor.
    //best practise to use data initialization in componentDidMount insteat of constructor.
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            GeolocationPosition => this.setState({ lat: GeolocationPosition.coords.latitude }),
            err => this.setState({errorMessage: err.message})
            
        )
    }


   //React says we have to define render or else it will throw errors.
    render() {
        if(this.state.errorMessage && !this.state.lat ) {
            return(<div>Error: {this.state.errorMessage} </div>)
        }

        if(!this.state.errorMessage && this.state.lat) {
            return(<SeasonDisplay lat={this.state.lat} />)
        }

        return <Spinner message="Please Click Allow"/>
        
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'))